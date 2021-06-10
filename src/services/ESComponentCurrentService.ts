import {
  ESComponentCurrent,
  ESComponentCurrentCreateAttributes,
} from "../models/ESComponentCurrent";
import { getComponentById } from "./ESComponentService";

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
