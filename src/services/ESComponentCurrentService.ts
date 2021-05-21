import {
  ESComponentCurrent,
  ESComponentCurrentCreateAttributes,
} from "../models/ESComponentCurrent";

export async function addESComponentCurrentToESComponent(
  esComponentId: number,
  esComponentCurrent: ESComponentCurrentCreateAttributes
): Promise<ESComponentCurrent> {
  return await ESComponentCurrent.create({
    ...esComponentCurrent,
    esComponentId,
  });
}
