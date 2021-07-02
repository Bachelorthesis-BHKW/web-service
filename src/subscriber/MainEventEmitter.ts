import EventEmitter from "events";
import { subscribeToNewEnergySystem } from "./NewEnergySystem";
import { EnergySystem } from "../models/EnergySystem";
import { subscribeToRunAlgorithm } from "./RunAlgorithm";
import {
  ESPatchTasks,
  subscribeToPatchEnergySystem,
} from "./PatchEnergySystem";

export default class MainEventEmitter extends EventEmitter {
  private static instance: MainEventEmitter;

  private constructor() {
    super();
  }

  public static getInstance(): MainEventEmitter {
    if (!MainEventEmitter.instance) {
      MainEventEmitter.instance = new MainEventEmitter();
      subscribeToNewEnergySystem(MainEventEmitter.instance);
      subscribeToRunAlgorithm(MainEventEmitter.instance);
      subscribeToPatchEnergySystem(MainEventEmitter.instance);
    }
    return MainEventEmitter.instance;
  }

  public newEnergySystem(energySystem: EnergySystem): void {
    this.emit(Events.NEW_ENERGY_SYSTEM, energySystem);
  }

  public runAlgorithm(energySystem: EnergySystem): void {
    this.emit(Events.RUN_ALGORITHM, energySystem);
  }

  public patchEnergySystem(
    energySystem: EnergySystem,
    tasks: ESPatchTasks
  ): void {
    this.emit(Events.PATCH_ENERGY_SYSTEM, energySystem, tasks);
  }
}

export enum Events {
  NEW_ENERGY_SYSTEM = "new_es",
  RUN_ALGORITHM = "run_algo",
  PATCH_ENERGY_SYSTEM = "patch_es",
}
