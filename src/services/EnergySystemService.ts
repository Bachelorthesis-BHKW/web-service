import {
  AlgorithmTrigger,
  EnergySystem,
  EnergySystemCreateAttributes,
} from "../models/EnergySystem";
import ExpressError, { ErrorCode } from "../error";
import MainEventEmitter from "../subscriber/MainEventEmitter";

const eventEmitter = MainEventEmitter.getInstance();

export async function createEnergySystem(
  energySystem: EnergySystemCreateAttributes,
  userId: number
): Promise<EnergySystem> {
  const newEnergySystem = await EnergySystem.create({
    ...energySystem,
    userId,
  });
  eventEmitter.newEnergySystem(newEnergySystem);
  return newEnergySystem;
}

export async function getEnergySystemById(
  energySystemId: number
): Promise<EnergySystem> {
  const energySystem = await EnergySystem.findByPk(energySystemId);
  if (!energySystem) throw new ExpressError(ErrorCode.NOT_FOUND_404);
  return energySystem;
}

export async function patchEnergySystemById(
  energySystemId: number,
  energySystem: EnergySystemCreateAttributes
): Promise<void> {
  const [updateCount] = await EnergySystem.update(energySystem, {
    where: { energySystemId },
  });
  if (!updateCount) throw new ExpressError(ErrorCode.NOT_FOUND_404);
  return;
}

export async function deleteEnergySystemById(
  energySystemId: number
): Promise<void> {
  const deleteCount = await EnergySystem.destroy({ where: { energySystemId } });
  if (!deleteCount) throw new ExpressError(ErrorCode.NOT_FOUND_404);
  return;
}

export async function getEnergySystemsWithTiming(): Promise<EnergySystem[]> {
  return EnergySystem.findAll({
    where: { algorithmTrigger: AlgorithmTrigger.time },
  });
}
