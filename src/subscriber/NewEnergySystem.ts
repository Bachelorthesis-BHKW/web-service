import MainEventEmitter, { Events } from "./MainEventEmitter";
import { EnergySystem } from "../models/EnergySystem";
import * as CircularBufferPointerService from "../services/CircularBufferPointerService";
import * as WeatherForecastService from "../services/WeatherForecastService";

export function subscribeToNewEnergySystem(emitter: MainEventEmitter): void {
  emitter.on(Events.NEW_ENERGY_SYSTEM, async (es: EnergySystem) => {
    await CircularBufferPointerService.createNewCircularBufferPointer(es);
    await WeatherForecastService.fetchHourlyWeatherForEnergySystem(es);
  });
}
