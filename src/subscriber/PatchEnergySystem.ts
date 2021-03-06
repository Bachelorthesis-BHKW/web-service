import MainEventEmitter, { Events } from "./MainEventEmitter";
import { addRegionToEnergySystem } from "../services/NominatimService";
import { EnergySystem } from "../models/EnergySystem";
import { setTimingForEnergySystem } from "../services/AlgorithmTimingService";
import { deleteAllConsumptionsOfES } from "../services/ESConsumptionService";
import { updateCircularBufferPointer } from "../services/CircularBufferPointerService";

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
      if (tasks.buffer) {
        await deleteAllConsumptionsOfES(energySystem);
        await updateCircularBufferPointer(energySystem);
      }
    }
  );
}
