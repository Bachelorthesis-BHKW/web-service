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
import { time } from "cron";

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
      absPVPower += getPVPowerForDate(hourlyPVForecast, date, energySystem);
    }

    await createWeatherForecast(
      { date: date, temperature: hour.temp, pvPower: absPVPower },
      energySystem.energySystemId
    );
  }
}

function getPVPowerForDate(
  hourlyPVForecast: ForecastSolarResponse,
  date: Date,
  energySystem: EnergySystem
) {
  const desiredStartDate = date;
  const desiredEndDate = new Date(date.getTime() + 1000 * 60 * 60); // date + 1 hour
  const pvDates = Object.keys(hourlyPVForecast.result.watt_hours_period);
  let timeZone = 1;
  if (energySystem.sommerzeit) {
    timeZone = 2;
  }

  let pvPower = 0;

  // Collect all PV-intervals that are relevant for the desired hour
  for (let i = 1; i < pvDates.length; i++) {
    const pvDate = pvDates[i];
    const prevPvDate = pvDates[i - 1];
    const pvIntervalStartDate = stringToDate(prevPvDate, timeZone);
    const pvIntervalEndDate = stringToDate(pvDate, timeZone);
    let relevantIntervalStartDate = new Date(desiredStartDate);
    let relevantIntervalEndDate = new Date(desiredEndDate);
    let intervalIsRelevant = false;

    if (
      desiredStartDate <= pvIntervalStartDate &&
      pvIntervalStartDate < desiredEndDate
    ) {
      // the interval starts in the desired hour
      intervalIsRelevant = true;
      relevantIntervalStartDate = pvIntervalStartDate;
    }

    if (
      desiredStartDate < pvIntervalEndDate &&
      pvIntervalEndDate <= desiredEndDate
    ) {
      // the interval ends in the desired hour
      intervalIsRelevant = true;
      relevantIntervalEndDate = pvIntervalEndDate;
    }

    if (
      pvIntervalStartDate < desiredStartDate &&
      desiredEndDate < pvIntervalEndDate
    ) {
      // the interval starts before and ends after the desired hour
      intervalIsRelevant = true;
      relevantIntervalStartDate = desiredStartDate;
      relevantIntervalEndDate = desiredEndDate;
    }

    if (!intervalIsRelevant) {
      continue;
    }
    const relevantMinutesOfPvInterval = Math.round(
      (relevantIntervalEndDate.getTime() -
        relevantIntervalStartDate.getTime()) /
        1000 /
        60
    );
    const totalMinutesOfPvInterval = Math.round(
      (pvIntervalEndDate.getTime() - pvIntervalStartDate.getTime()) / 1000 / 60
    );
    const totalPowerOfPvInterval =
      hourlyPVForecast.result.watt_hours_period[pvDate];
    const relevantPowerOfPvInterval = Math.round(
      (totalPowerOfPvInterval * relevantMinutesOfPvInterval) /
        totalMinutesOfPvInterval
    );
    if (relevantMinutesOfPvInterval != 60 || totalMinutesOfPvInterval != 60) {
      console.log(
        desiredStartDate.toTimeString() + ":",
        "Interpolated " +
          relevantPowerOfPvInterval +
          " Wh in " +
          relevantMinutesOfPvInterval +
          " minutes."
      );
    }
    pvPower += relevantPowerOfPvInterval;
  }
  console.log(
    desiredStartDate.toTimeString() + ":",
    pvPower + " Wh for PV system."
  );
  return pvPower;
}

function stringToDate(dateString: string, timeZone: number) {
  const [year, month, day, hour, minute, second] = dateString.split(/[- :]/);
  const dateObject = new Date(
    parseInt(year),
    parseInt(month) - 1, // Month in JavaScript Date object is zero-based
    parseInt(day),
    parseInt(hour) - timeZone,
    parseInt(minute),
    parseInt(second)
  );
  return dateObject;
}
