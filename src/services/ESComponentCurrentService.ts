import {
  ESComponentCurrent,
  ESComponentCurrentCreateAttributes,
} from "../models/ESComponentCurrent";
import { getComponentById } from "./ESComponentService";
import { ESComponent } from "../models/ESComponent";
import { Op } from "sequelize";

async function addESComponentCurrentToESComponent(
  component: ESComponent,
  esComponentCurrent: ESComponentCurrentCreateAttributes
): Promise<void> {
  if (component.circularBufferPointer >= component.circularBufferMax)
    component.circularBufferPointer = 0;

  await ESComponentCurrent.upsert({
    ...esComponentCurrent,
    esComponentId: component.esComponentId,
    bufferIndex: component.circularBufferPointer,
  });

  component.circularBufferPointer++;
  await component.save();
  return;
}

export async function addESComponentCurrentsToESComponent(
  esComponentId: number,
  esComponentCurrent: ESComponentCurrentCreateAttributes[]
): Promise<void> {
  const component = await getComponentById(esComponentId);
  for (const current of esComponentCurrent) {
    await addESComponentCurrentToESComponent(component, current);
  }
}

export async function getAllCurrentsBetweenDateInterval(
  interval: [Date, Date],
  component: ESComponent
): Promise<ESComponentCurrent[]> {
  return ESComponentCurrent.findAll({
    where: {
      [Op.and]: [
        { esComponentId: component.esComponentId },
        {
          createdAt: {
            [Op.between]: interval,
          },
        },
      ],
    },
  });
}
