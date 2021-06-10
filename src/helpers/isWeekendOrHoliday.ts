import { isSunOrHoliday, Region } from "feiertagejs";

export default function isWeekendOrHoliday(
  date: Date,
  region: Region
): boolean {
  return isSunOrHoliday(date, region) || date.getDay() === 6;
}
