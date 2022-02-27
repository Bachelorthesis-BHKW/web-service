import { AlgorithmTrigger, EnergySystem } from "../models/EnergySystem";
import { CronHelper } from "../helpers/CronHelper";
import ControlAlgorithmHelper from "../helpers/ControlAlgorithmHelper";
import { writeMailOrFtpDataIntoDB } from "./writeMailOrFtpDataIntoDBService"

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
    async () => {
      if (energySystem.mailInputTrigger || energySystem.ftpInputTrigger) {
        await writeMailOrFtpDataIntoDB(energySystem).then(function(){console.log('starting algorithm');
          ControlAlgorithmHelper.runWithEnergySystem(energySystem)}).catch(function(){console.log('no mail data available')});
      } else {
        ControlAlgorithmHelper.runWithEnergySystem(energySystem);
      }
    }
  );
}

function removeAlgorithmTimeTriggerForEnergySystem(
  energySystem: EnergySystem
): void {
  CronHelper.stopJobWithId(energySystem.energySystemId);
}
