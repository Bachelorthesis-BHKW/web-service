import {
  ESComponentCurrent,
  ESComponentCurrentCreateAttributes,
} from "../models/ESComponentCurrent";
import { getComponentById } from "./ESComponentService";
import { ESComponent } from "../models/ESComponent";
import { Op } from "sequelize";

export async function addESComponentCurrentToESComponent(
  esComponentId: number,
  esComponentCurrent: ESComponentCurrentCreateAttributes
): Promise<void> {
  const component = await getComponentById(esComponentId);
  if (component.circularBufferPointer >= component.circularBufferMax)
    component.circularBufferPointer = 0;

  await ESComponentCurrent.upsert({
    ...esComponentCurrent,
    esComponentId,
    bufferIndex: component.circularBufferPointer,
  });

  component.circularBufferPointer++;
  await component.save();
  return;
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
