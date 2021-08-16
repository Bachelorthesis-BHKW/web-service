import { PythonShell } from "python-shell";
import config from "../config";
import { EnergySystem } from "../models/EnergySystem";
import { getWeekendOrHolidayForNextNDays } from "./isWeekendOrHoliday";

export default class ControlAlgorithmHelper {
  static runWithEnergySystem(energySystem: EnergySystem): void {
    if (!config.controlAlgorithmPath)
      throw Error("Control Algorithm path not set!");
    PythonShell.run(
      config.controlAlgorithmPath,
      {
        args: [
          energySystem.energySystemId.toString(10),
          String(getWeekendOrHolidayForNextNDays(14, energySystem.region, 15)),
        ],
      },
      (err, result) => {
        if (err) console.log(err);
        else console.log(result);
      }
    );
  }
}
