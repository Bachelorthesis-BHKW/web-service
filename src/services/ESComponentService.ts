import {
  ESComponent,
  ESComponentCreateAttributes,
} from "../models/ESComponent";
import ExpressError, { ErrorCode } from "../error";
import { ESComponentCurrent } from "../models/ESComponentCurrent";

export async function addComponentToES(
  energySystemId: number,
  esComponent: ESComponentCreateAttributes
): Promise<ESComponent> {
  let circularBufferMax: number | undefined = undefined;
  if (esComponent.maxHistoryDays && esComponent.currentsPostIntervalMin) {
    const maxHistoryMin = esComponent.maxHistoryDays * 24 * 60;

    circularBufferMax = Math.ceil(
      maxHistoryMin / esComponent.currentsPostIntervalMin
    );
  }
  return await ESComponent.create({
    ...esComponent,
    energySystemId,
    circularBufferMax,
  });
}

export async function getComponentById(
  esComponentId: number
): Promise<ESComponent> {
  const esComponent = await ESComponent.findByPk(esComponentId);
  if (!esComponent) throw new ExpressError(ErrorCode.NOT_FOUND_404);
  return esComponent;
}

export async function getComponentsByEnergySystemId(
  energySystemId: number
): Promise<ESComponent[]> {
  return ESComponent.findAll({
    where: { energySystemId },
    include: ESComponentCurrent,
  });
}

export async function patchComponent(
  esComponentId: number,
  esComponent: ESComponentCreateAttributes
): Promise<void> {
  const component = await getComponentById(esComponentId);
  esComponent.kenngroessen = {
    ...component.kenngroessen,
    ...esComponent.kenngroessen,
  };
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
