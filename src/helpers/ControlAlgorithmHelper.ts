import { PythonShell } from "python-shell";
import config from "../config";

export default class ControlAlgorithmHelper {
  static runWithEnergySystemId(energySystemId: number): void {
    if (!config.controlAlgorithmPath)
      throw Error("Control Algorithm path not set!");
    PythonShell.run(
      config.controlAlgorithmPath,
      { args: [energySystemId.toString(10)] },
      (err, result) => {
        if (err) console.log(err);
        else console.log(result);
      }
    );
  }
}
