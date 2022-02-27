import {
  WeatherForecast,
  WeatherForecastCreateAttributes,
} from "../models/WeatherForecast";
import OpenWeatherMap from "../apis/OpenWeatherMap/OpenWeatherMap";
import { getCircularBufferPointerForEnergySystem } from "./CircularBufferPointerService";
import { EnergySystem } from "../models/EnergySystem";

const openWeatherClient = OpenWeatherMap.getInstance();

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
  const hourlyForecast = await openWeatherClient.getHourlyForecastForLocation(
    energySystem.latitude,
    energySystem.longitude
  );
  for (const hour of hourlyForecast.hourly)
    await createWeatherForecast(
      { date: new Date(hour.dt * 1000), temperature: hour.temp },
      energySystem.energySystemId
    );
}
