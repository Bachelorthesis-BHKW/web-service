import MainEventEmitter, { Events } from "./MainEventEmitter";
import * as CircularBufferPointerService from "../services/CircularBufferPointerService";
import * as WeatherForecastService from "../services/WeatherForecastService";

export function subscribeToNewEnergySystem(emitter: MainEventEmitter): void {
  emitter.on(Events.NEW_ENERGY_SYSTEM, async (energySystemId: number) => {
    await CircularBufferPointerService.createNewCircularBufferPointer(
      energySystemId
    );
    await WeatherForecastService.fetchHourlyWeatherForEnergySystem(
      energySystemId
    );
  });
}
