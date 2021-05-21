import {
  ESConsumption,
  ESConsumptionCreateAttributes,
} from "../models/ESConsumption";

export async function addConsumptionToES(
  consumption: ESConsumptionCreateAttributes,
  energySystemId: number
): Promise<void> {
  await ESConsumption.create({
    ...consumption,
    energySystemId: energySystemId,
  });
  return;
}
