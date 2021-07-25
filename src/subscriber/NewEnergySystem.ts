import MainEventEmitter, { Events } from "./MainEventEmitter";
import { addRegionToEnergySystem } from "../services/NominatimService";
import { createNewCircularBufferPointer } from "../services/CircularBufferPointerService";
import { fetchHourlyWeatherForEnergySystem } from "../services/WeatherForecastService";
import { EnergySystem } from "../models/EnergySystem";
import { setTimingForEnergySystem } from "../services/AlgorithmTimingService";

export function subscribeToNewEnergySystem(emitter: MainEventEmitter): void {
  emitter.on(Events.NEW_ENERGY_SYSTEM, async (energySystem: EnergySystem) => {
    try {
      await createNewCircularBufferPointer(energySystem);
      await fetchHourlyWeatherForEnergySystem(energySystem);
      await addRegionToEnergySystem(energySystem);
      await setTimingForEnergySystem(energySystem);
    } catch (e) {
      console.warn(e);
      await energySystem.destroy();
    }
  });
}
