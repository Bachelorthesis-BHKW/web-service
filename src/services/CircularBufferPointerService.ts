import { CircularBufferPointer } from "../models/CircularBufferPointer";
import { EnergySystem } from "../models/EnergySystem";
import ExpressError, { ErrorCode } from "../error";

export async function createNewCircularBufferPointer(
  energySystem: EnergySystem
): Promise<CircularBufferPointer> {
  const maxHistoryMin = energySystem.maxHistoryDays * 24 * 60;

  const maxEsConsumption = Math.ceil(
    maxHistoryMin / energySystem.consumptionPostIntervalMin
  );

  const maxWeatherForecast = Math.ceil(
    maxHistoryMin / energySystem.consumptionPostIntervalMin
  );

  return CircularBufferPointer.create({
    energySystemId: energySystem.energySystemId,
    maxEsConsumption,
    maxWeatherForecast,
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
