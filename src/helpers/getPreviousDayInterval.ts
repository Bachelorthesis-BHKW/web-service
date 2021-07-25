export default function getPreviousDayIntervalForDate(
  date: Date
): [Date, Date] {
  const intervalEnd = new Date(
    date.getTime() -
      date.getMilliseconds() -
      date.getSeconds() * 1000 -
      date.getMinutes() * 60 * 1000 -
      date.getHours() * 60 * 60 * 1000
  );
  const intervalStart = new Date(intervalEnd.getTime() - 1000 * 60 * 60 * 24);
  return [intervalStart, intervalEnd];
}
