import { CircularBufferPointer } from "../models/CircularBufferPointer";
import ExpressError, { ErrorCode } from "../error";
import { EnergySystem } from "../models/EnergySystem";

export async function createNewCircularBufferPointer(
  energySystem: EnergySystem
): Promise<CircularBufferPointer> {
  const maxEsConsumption = calculateMaxEsConsumption(energySystem);
  return CircularBufferPointer.create({
    energySystemId: energySystem.energySystemId,
    maxEsConsumption,
  });
}

export async function updateCircularBufferPointer(
  energySystem: EnergySystem
): Promise<void> {
  const maxEsConsumption = calculateMaxEsConsumption(energySystem);
  await CircularBufferPointer.update(
    { maxEsConsumption: maxEsConsumption, esConsumptionPointer: 0 },
    { where: { energySystemId: energySystem.energySystemId } }
  );
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

function calculateMaxEsConsumption(energySystem: EnergySystem): number {
  const maxHistoryMin = energySystem.maxHistoryDays * 24 * 60;
  return Math.ceil(maxHistoryMin / energySystem.consumptionPostIntervalMin);
}
