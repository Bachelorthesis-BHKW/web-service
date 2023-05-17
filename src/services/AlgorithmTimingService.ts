import { AlgorithmTrigger, EnergySystem } from "../models/EnergySystem";
import { CronHelper } from "../helpers/CronHelper";
import ControlAlgorithmHelper from "../helpers/ControlAlgorithmHelper";
import { writeMailOrFtpDataIntoDB } from "./writeMailOrFtpDataIntoDBService"
import { writeElectricityPriceForecastIntoDB } from "./ElectricityPriceForecastService";
import { getEnergySystemById } from "./EnergySystemService";
import { fetchHourlyWeatherForEnergySystem } from "./WeatherForecastService";

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
    async function() {
      energySystem = await getEnergySystemById(energySystem.energySystemId)
      
      if (energySystem.mailInputTrigger || energySystem.ftpInputTrigger) {
        await writeMailOrFtpDataIntoDB(energySystem).catch(function() {
          console.log('no mail data available');
        })
      }

      if (energySystem.prognosemethodeEl == 2) {
        await writeElectricityPriceForecastIntoDB(energySystem).catch(function() {
          console.log('no electricity price forecast available');
        })
      }
      await new Promise(r => setTimeout(r, 2000));  // Pause for 2 sec.

      console.log('fetching weather forecast');
      await fetchHourlyWeatherForEnergySystem(energySystem);
      console.log('starting algorithm');
      ControlAlgorithmHelper.runWithEnergySystem(energySystem);
    }
  );
}

function removeAlgorithmTimeTriggerForEnergySystem(
  energySystem: EnergySystem
): void {
  CronHelper.stopJobWithId(energySystem.energySystemId);
}
