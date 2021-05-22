import {
  ESConsumption,
  ESConsumptionCreateAttributes,
} from "../models/ESConsumption";
import * as CircularBufferPointerService from "./CircularBufferPointerService";

export async function addConsumptionToES(
  consumption: ESConsumptionCreateAttributes,
  energySystemId: number
): Promise<void> {
  const bufferPointer =
    await CircularBufferPointerService.getCircularBufferPointerForEnergySystem(
      energySystemId
    );
  if (bufferPointer.esConsumptionPointer >= bufferPointer.maxEsConsumption)
    bufferPointer.esConsumptionPointer = 0;

  await ESConsumption.upsert({
    ...consumption,
    energySystemId: energySystemId,
    bufferIndex: bufferPointer.esConsumptionPointer,
  });

  bufferPointer.esConsumptionPointer++;
  await bufferPointer.save();
  return;
}

export async function addConsumptionsToES(
  consumptions: ESConsumptionCreateAttributes[],
  energySystemId: number
): Promise<void> {
  for (const c of consumptions) {
    await addConsumptionToES(c, energySystemId);
  }
}
