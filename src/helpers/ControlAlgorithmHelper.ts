import { PythonShell } from "python-shell";
import config from "../config";
import isWeekendOrHoliday from "./isWeekendOrHoliday";
import { EnergySystem } from "../models/EnergySystem";

export default class ControlAlgorithmHelper {
  static runWithEnergySystem(energySystem: EnergySystem): void {
    if (!config.controlAlgorithmPath)
      throw Error("Control Algorithm path not set!");
    PythonShell.run(
      config.controlAlgorithmPath,
      {
        args: [
          energySystem.energySystemId.toString(10),
          String(isWeekendOrHoliday(new Date(), energySystem.region)),
        ],
      },
      (err, result) => {
        if (err) console.log(err);
        else console.log(result);
      }
    );
  }
}
