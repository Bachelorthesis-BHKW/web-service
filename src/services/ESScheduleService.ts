import ExpressError, { ErrorCode } from "../error";
import { ESSchedule } from "../models/ESSchedule";

export async function getESScheduleByEnergySystemId(
  energySystemId: number
): Promise<ESSchedule> {
  const esSchedule = await ESSchedule.findOne({ where: { energySystemId } });
  if (!esSchedule) throw new ExpressError(ErrorCode.NOT_FOUND_404);
  return esSchedule;
}
