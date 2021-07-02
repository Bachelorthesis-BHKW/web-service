import { AlgorithmTrigger, EnergySystem } from "../models/EnergySystem";
import { CronHelper } from "../helpers/CronHelper";
import ControlAlgorithmHelper from "../helpers/ControlAlgorithmHelper";

export function setTimingForEnergySystem(energySystem: EnergySystem): void {
  if (energySystem.algorithmTrigger == AlgorithmTrigger.time) {
    addAlgorithmTimeTriggerForEnergySystem(energySystem);
  } else {
    removeAlgorithmTimeTriggerForEnergySystem(energySystem);
  }
}

function addAlgorithmTimeTriggerForEnergySystem(
  energySystem: EnergySystem
): void {
  CronHelper.upsertJob(
    energySystem.cronTriggerTime,
    energySystem.energySystemId,
    () => {
      ControlAlgorithmHelper.runWithEnergySystem(energySystem);
    }
  );
}

function removeAlgorithmTimeTriggerForEnergySystem(
  energySystem: EnergySystem
): void {
  CronHelper.stopJobWithId(energySystem.energySystemId);
}
