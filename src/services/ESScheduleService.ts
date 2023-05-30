import ExpressError, { ErrorCode } from "../error";
import { ESSchedule } from "../models/ESSchedule";
import { EnergySystem } from "../models/EnergySystem";
import MainEventEmitter from "../subscriber/MainEventEmitter";
import { getEnergySystemById } from "./EnergySystemService";
import { time } from "cron";

const eventEmitter = MainEventEmitter.getInstance();

export async function getESScheduleByEnergySystemId(
  energySystemId: number,
  esComponentId: number
): Promise<ESSchedule> {
  const esSchedule = await ESSchedule.findOne({
    where: { energySystemId, esComponentId },
  });
  const oneDayAgo = new Date(new Date().getTime() - 1000 * 60 * 60 * 24);
  if (!esSchedule || esSchedule.updatedAt < oneDayAgo)
    throw new ExpressError(ErrorCode.NOT_FOUND_404);

  const energySystem = await getEnergySystemById(energySystemId);
  let timeCorrection = 1;
  if (energySystem.sommerzeit) {
    timeCorrection = 2; // mitteleuropäische Winterzeit: timeCorrection = 1
    // mitteleuropäische Sommerzeit: timeCorrection = 2
  }
  const timeInTimeZone = new Date(
    esSchedule.updatedAt.getTime() + 1000 * 60 * 60 * timeCorrection
  );
  esSchedule.updatedAtMez = timeInTimeZone;
  esSchedule.validFrom = timeInTimeZone;

  // always return last 24 hours of schedule only
  const timeArray = esSchedule.schedule as number[];
  const maxSize = Math.ceil(1440 / esSchedule.timeIntervalMin);
  if (timeArray.length > maxSize) {
    const firstIndex = timeArray.length - maxSize;
    const lastIndex = timeArray.length - 1;
    esSchedule.schedule = timeArray.splice(firstIndex, lastIndex);
    const validFrom = new Date(
      esSchedule.updatedAtMez.getTime() +
        1000 * 60 * firstIndex * esSchedule.timeIntervalMin
    );
    esSchedule.validFrom = validFrom;
  }

  return esSchedule;
}

export async function getESScheduleNowByEnergySystemId(
  energySystemId: number
): Promise<number> {
  const esSchedule = await ESSchedule.findOne({ where: { energySystemId } });
  if (!esSchedule) throw new ExpressError(ErrorCode.NOT_FOUND_404);
  const timeArray = esSchedule.schedule as number[];
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
