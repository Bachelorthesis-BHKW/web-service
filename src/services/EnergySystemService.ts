import {
  EnergySystem,
  EnergySystemCreateAttributes,
} from "../models/EnergySystem";
import ExpressError, { ErrorCode } from "../error";

export async function createEnergySystem(
  energySystem: EnergySystemCreateAttributes,
  userId: number
): Promise<EnergySystem> {
  return EnergySystem.create({ ...energySystem, userId });
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
