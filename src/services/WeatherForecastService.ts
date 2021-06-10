import {
  WeatherForecast,
  WeatherForecastCreateAttributes,
} from "../models/WeatherForecast";
import OpenWeatherMap from "../apis/OpenWeatherMap/OpenWeatherMap";
import { getCircularBufferPointerForEnergySystem } from "./CircularBufferPointerService";
import { getEnergySystemById } from "./EnergySystemService";

const openWeatherClient = OpenWeatherMap.getInstance();

async function createWeatherForecast(
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
  energySystemId: number
): Promise<void> {
  const energySystem = await getEnergySystemById(energySystemId);
  const hourlyForecast = await openWeatherClient.getHourlyForecastForLocation(
    energySystem.longitude,
    energySystem.longitude
  );
  for (const hour of hourlyForecast.hourly)
    await createWeatherForecast(
      { date: new Date(hour.dt * 1000), temperature: hour.temp },
      energySystem.energySystemId
    );
}
