import { getEnergySystemsWithTiming } from "../services/EnergySystemService";
import { setTimingForEnergySystem } from "../services/AlgorithmTimingService";
import { CronJob } from "cron";
import { archiveEnergySystemData } from "../services/HistoricService";

export default async function cronLoader(): Promise<void> {
  const energySystemsWithTiming = await getEnergySystemsWithTiming();
  energySystemsWithTiming.forEach((es) => {
    try {
      setTimingForEnergySystem(es);
    } catch (e) {
      console.warn(e);
    }
  });
  new CronJob("10 0 * * *", () => archiveEnergySystemData(), null, true);
}
