import { isSunOrHoliday, Region } from "feiertagejs";

export default function isWeekendOrHoliday(
  date: Date,
  region: Region
): boolean {
  return isSunOrHoliday(date, region) || date.getDay() === 6;
}

export function getWeekendOrHolidayForNextNDays(
  n: number,
  region: Region,
  offsetInMin = 0
): boolean[] {
  const dates: Date[] = [];
  const currentDateWithOffset = new Date().getTime() + offsetInMin * 60 * 1000;
  for (let i = 0; i < n; i++) {
    dates.push(new Date(currentDateWithOffset + 1000 * 60 * 60 * 24 * i));
  }
  return dates.map((date) => isWeekendOrHoliday(date, region));
}
