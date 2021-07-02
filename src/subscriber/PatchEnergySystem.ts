import MainEventEmitter, { Events } from "./MainEventEmitter";
import { addRegionToEnergySystem } from "../services/NominatimService";
import { EnergySystem } from "../models/EnergySystem";
import { setTimingForEnergySystem } from "../services/AlgorithmTimingService";

export type ESPatchTasks = {
  region: boolean;
  timing: boolean;
  buffer: boolean;
};
export function subscribeToPatchEnergySystem(emitter: MainEventEmitter): void {
  emitter.on(
    Events.PATCH_ENERGY_SYSTEM,
    async (energySystem: EnergySystem, tasks: ESPatchTasks) => {
      if (tasks.region) await addRegionToEnergySystem(energySystem);
      if (tasks.timing) setTimingForEnergySystem(energySystem);
      if (tasks.buffer) console.log();
    }
  );
}
