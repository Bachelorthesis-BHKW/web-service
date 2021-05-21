import {
  ESComponent,
  ESComponentCreateAttributes,
} from "../models/ESComponent";
import ExpressError, { ErrorCode } from "../error";

export async function addComponentToES(
  energySystemId: number,
  esComponent: ESComponentCreateAttributes
): Promise<ESComponent> {
  return await ESComponent.create({ ...esComponent, energySystemId });
}

export async function getComponentById(
  esComponentId: number
): Promise<ESComponent> {
  const esComponent = await ESComponent.findByPk(esComponentId);
  if (!esComponent) throw new ExpressError(ErrorCode.NOT_FOUND_404);
  return esComponent;
}

export async function patchComponent(
  esComponentId: number,
  esComponent: ESComponentCreateAttributes
): Promise<void> {
  const [updateCount] = await ESComponent.update(esComponent, {
    where: { esComponentId },
  });
  if (!updateCount) throw new ExpressError(ErrorCode.NOT_FOUND_404);
  return;
}

export async function deleteComponent(esComponentId: number): Promise<void> {
  const deleteCount = await ESComponent.destroy({ where: { esComponentId } });
  if (!deleteCount) throw new ExpressError(ErrorCode.NOT_FOUND_404);
  return;
}
