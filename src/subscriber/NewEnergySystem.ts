import MainEventEmitter, { Events } from "./MainEventEmitter";
import { EnergySystem } from "../models/EnergySystem";
import * as CircularBufferPointerService from "../services/CircularBufferPointerService";

export function subscribeToNewEnergySystem(emitter: MainEventEmitter): void {
  emitter.on(Events.NEW_ENERGY_SYSTEM, async (es: EnergySystem) => {
    await CircularBufferPointerService.createNewCircularBufferPointer(es);
  });
}
