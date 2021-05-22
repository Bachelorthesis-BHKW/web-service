import EventEmitter from "events";
import { subscribeToNewEnergySystem } from "./NewEnergySystem";

export default class MainEventEmitter extends EventEmitter {
  private static instance: MainEventEmitter;

  private constructor() {
    super();
  }

  public static getInstance(): MainEventEmitter {
    if (!MainEventEmitter.instance) {
      MainEventEmitter.instance = new MainEventEmitter();
      subscribeToNewEnergySystem(MainEventEmitter.instance);
    }
    return MainEventEmitter.instance;
  }

  public newEnergySystem(energySystemId: number): void {
    this.emit(Events.NEW_ENERGY_SYSTEM, energySystemId);
  }
}

export enum Events {
  NEW_ENERGY_SYSTEM = "new_es",
}
