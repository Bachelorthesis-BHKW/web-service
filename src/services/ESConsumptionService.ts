import {
  ESConsumption,
  ESConsumptionCreateAttributes,
} from "../models/ESConsumption";
import isWeekendOrHoliday from "../helpers/isWeekendOrHoliday";
import { getCircularBufferPointerForEnergySystem } from "./CircularBufferPointerService";
import { getEnergySystemById } from "./EnergySystemService";
import { EnergySystem } from "../models/EnergySystem";
import { Op } from "sequelize";
import { writeMailOrFtpDataIntoDB } from "./writeMailOrFtpDataIntoDBService";

export async function addConsumptionToES(
  consumption: ESConsumptionCreateAttributes,
  energySystemId: number
): Promise<void> {
  const energySystem = await getEnergySystemById(energySystemId);
  const bufferPointer = await getCircularBufferPointerForEnergySystem(
    energySystemId
  );
  if (bufferPointer.esConsumptionPointer >= bufferPointer.maxEsConsumption)
    bufferPointer.esConsumptionPointer = 0;

  await ESConsumption.upsert({
    ...consumption,
    energySystemId: energySystemId,
    bufferIndex: bufferPointer.esConsumptionPointer,
    holiday: isWeekendOrHoliday(
      new Date(consumption.date),
      energySystem.region
    ),
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

export async function deleteAllConsumptionsOfES(
  energySystem: EnergySystem
): Promise<void> {
  await ESConsumption.destroy({
    where: { energySystemId: energySystem.energySystemId },
  });
}

export async function getAllConsumptionsForES(
  energySystem: EnergySystem
): Promise<ESConsumption[]> {

  // Aufruf Mail-Service zur Erprobung todo: Nach Erprobung entfernen!!!
  await writeMailOrFtpDataIntoDB(energySystem);

  return energySystem.getESConsumptions();
}

export async function getAllConsumptionsBetweenDateInterval(
  interval: [Date, Date],
  energySystem: EnergySystem
): Promise<ESConsumption[]> {
  return ESConsumption.findAll({
    where: {
      [Op.and]: [
        { energySystemId: energySystem.energySystemId },
        {
          createdAt: {
            [Op.between]: interval,
          },
        },
      ],
    },
  });
}
