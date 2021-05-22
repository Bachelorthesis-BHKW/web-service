import { CircularBufferPointer } from "../models/CircularBufferPointer";
import { EnergySystem } from "../models/EnergySystem";

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
