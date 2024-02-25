import {
  WeatherForecast,
  WeatherForecastCreateAttributes,
} from "../models/WeatherForecast";
import OpenWeatherMap from "../apis/OpenWeatherMap/OpenWeatherMap";
import ForecastSolar from "../apis/ForecastSolar/ForecastSolar";
import { getCircularBufferPointerForEnergySystem } from "./CircularBufferPointerService";
import { EnergySystem } from "../models/EnergySystem";
import { ESComponentType } from "../es_components/ESComponentType";
import PV from "../es_components/PV";
import ForecastSolarResponse from "../apis/ForecastSolar/ForecastSolarResponse";

const openWeatherClient = OpenWeatherMap.getInstance();
const forecastSolarClient = ForecastSolar.getInstance();

export async function createWeatherForecast(
  weatherForecast: WeatherForecastCreateAttributes,
  energySystemId: number
): Promise<void> {
  const bufferPointer = await getCircularBufferPointerForEnergySystem(
    energySystemId
  );
  if (bufferPointer.weatherForecastPointer >= bufferPointer.maxWeatherForecast)
    bufferPointer.weatherForecastPointer = 0;

  await WeatherForecast.upsert({
    ...weatherForecast,
    energySystemId: energySystemId,
    bufferIndex: bufferPointer.weatherForecastPointer,
  });

  bufferPointer.weatherForecastPointer++;
  await bufferPointer.save();
  return;
}

export async function fetchHourlyWeatherForEnergySystem(
  energySystem: EnergySystem
): Promise<void> {
  //Weather Forecast
  const hourlyWeatherForecast =
    await openWeatherClient.getHourlyForecastForLocation(
      energySystem.latitude,
      energySystem.longitude
    );

  //PV Forecast for each PV-System
  const components = await energySystem.getESComponents();
  const hourlyPVForecasts: ForecastSolarResponse[] = [];
  for (const component of components) {
    if (component.type != ESComponentType.PV) {
      continue;
    }

    const pvParams = component.kenngroessen as PV;
    const hourlyPVForecast =
      await forecastSolarClient.getHourlyForecastForPVSystem(
        energySystem.latitude,
        energySystem.longitude,
        pvParams.kollsteigung,
        pvParams.kollazi,
        pvParams.kollpower_kW
      );
    console.log("forecast " + component.name, hourlyPVForecast);
    hourlyPVForecasts.push(hourlyPVForecast);
  }

  // Write to DB
  for (const hour of hourlyWeatherForecast.hourly) {
    const date = new Date(hour.dt * 1000);

    // Match PV-Data to Weather-Forecast time
    let absPVPower = 0;
    for (const hourlyPVForecast of hourlyPVForecasts) {
      absPVPower += getPVPowerForDate(hourlyPVForecast, date);
    }

    await createWeatherForecast(
      { date: date, temperature: hour.temp, pvPower: absPVPower },
      energySystem.energySystemId
    );
  }
}

function getPVPowerForDate(
  hourlyPVForecast: ForecastSolarResponse,
  date: Date
) {
  let maxPVPower = 0;
  const pvDates = Object.keys(hourlyPVForecast.result.watt_hours_period);
  pvDates.forEach((pvDate) => {
    const [year, month, day, hour, minute, second] = pvDate.split(/[- :]/);
    const pvDateObject = new Date(
      parseInt(year),
      parseInt(month) - 1, // Month in JavaScript Date object is zero-based
      parseInt(day),
      parseInt(hour),
      parseInt(minute),
      parseInt(second)
    );

    const differenceInMinutes = Math.floor(
      (date.getTime() - pvDateObject.getTime()) / 1000 / 60
    );
    //console.log("difference in minutes:", differenceInMinutes);
    if (differenceInMinutes < 60 && differenceInMinutes >= 0) {
      const pvPower = hourlyPVForecast.result.watt_hours_period[pvDate];
      if (pvPower > maxPVPower) {
        maxPVPower = pvPower;
      }
    }
  });
  return maxPVPower;
}
