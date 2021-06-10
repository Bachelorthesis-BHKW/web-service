import { CircularBufferPointer } from "../models/CircularBufferPointer";
import ExpressError, { ErrorCode } from "../error";
import { getEnergySystemById } from "./EnergySystemService";

export async function createNewCircularBufferPointer(
  energySystemId: number
): Promise<CircularBufferPointer> {
  const energySystem = await getEnergySystemById(energySystemId);
  const maxHistoryMin = energySystem.maxHistoryDays * 24 * 60;

  const maxEsConsumption = Math.ceil(
    maxHistoryMin / energySystem.consumptionPostIntervalMin
  );

  return CircularBufferPointer.create({
    energySystemId: energySystem.energySystemId,
    maxEsConsumption,
  });
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
