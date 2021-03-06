import ExpressError, { ErrorCode } from "../error";
import { ESSchedule } from "../models/ESSchedule";
import { EnergySystem } from "../models/EnergySystem";
import MainEventEmitter from "../subscriber/MainEventEmitter";

const eventEmitter = MainEventEmitter.getInstance();

export async function getESScheduleByEnergySystemId(
  energySystemId: number,
  esComponentId: number
): Promise<ESSchedule> {
  const esSchedule = await ESSchedule.findOne({
    where: { energySystemId, esComponentId },
  });
  if (!esSchedule || esSchedule.updatedAt.getDate() != new Date().getDate())
    throw new ExpressError(ErrorCode.NOT_FOUND_404);
  return esSchedule;
}

export async function getESScheduleNowByEnergySystemId(
  energySystemId: number
): Promise<number> {
  const esSchedule = await ESSchedule.findOne({ where: { energySystemId } });
  if (!esSchedule) throw new ExpressError(ErrorCode.NOT_FOUND_404);
  const timeArray = JSON.parse(esSchedule.schedule) as number[];
  const date = new Date();
  const timeInMinutes = date.getMinutes() + date.getHours() * 60;
  const index = Math.floor(timeInMinutes / esSchedule.timeIntervalMin);
  if (!index || index < 0 || index >= timeArray.length)
    throw new ExpressError(ErrorCode.INTERNAL_SERVER_ERROR_500);

  return timeArray[index];
}

export function runControlAlgorithm(energySystem: EnergySystem): void {
  eventEmitter.runAlgorithm(energySystem);
}
