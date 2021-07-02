import { CircularBufferPointer } from "../models/CircularBufferPointer";
import ExpressError, { ErrorCode } from "../error";
import { EnergySystem } from "../models/EnergySystem";

export async function createNewCircularBufferPointer(
  energySystem: EnergySystem
): Promise<CircularBufferPointer> {
  const maxHistoryMin = energySystem.maxHistoryDays * 24 * 60;

  const maxEsConsumption = Math.ceil(
    maxHistoryMin / energySystem.consumptionPostIntervalMin
  );

  return CircularBufferPointer.create({
    energySystemId: energySystem.energySystemId,
    maxEsConsumption,
  });
}

export async function updateCircularBufferPointer(
  energySystem: EnergySystem
): Promise<void> {
  await CircularBufferPointer.destroy({
    where: { energySystemId: energySystem.energySystemId },
  });
  await createNewCircularBufferPointer(energySystem);
}

export async function getCircularBufferPointerForEnergySystem(
  energySystemId: number
): Promise<CircularBufferPointer> {
  const circularBufferPointer = await CircularBufferPointer.findOne({
    where: { energySystemId },
  });
  if (!circularBufferPointer) throw new ExpressError(ErrorCode.NOT_FOUND_404);
  return circularBufferPointer;
}
