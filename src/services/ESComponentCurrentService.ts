import {
  ESComponentCurrent,
  ESComponentCurrentCreateAttributes,
} from "../models/ESComponentCurrent";
import * as ESComponentService from "./ESComponentService";

export async function addESComponentCurrentToESComponent(
  esComponentId: number,
  esComponentCurrent: ESComponentCurrentCreateAttributes
): Promise<void> {
  const component = await ESComponentService.getComponentById(esComponentId);
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
