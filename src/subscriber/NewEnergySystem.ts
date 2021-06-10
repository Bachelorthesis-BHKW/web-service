import MainEventEmitter, { Events } from "./MainEventEmitter";
import { addRegionToEnergySystem } from "../services/NominatimService";
import { createNewCircularBufferPointer } from "../services/CircularBufferPointerService";
import { fetchHourlyWeatherForEnergySystem } from "../services/WeatherForecastService";

export function subscribeToNewEnergySystem(emitter: MainEventEmitter): void {
  emitter.on(Events.NEW_ENERGY_SYSTEM, async (energySystemId: number) => {
    await createNewCircularBufferPointer(energySystemId);
    await fetchHourlyWeatherForEnergySystem(energySystemId);
    await addRegionToEnergySystem(energySystemId);
  });
}
