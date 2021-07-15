import { getEnergySystemsWithTiming } from "../services/EnergySystemService";
import { setTimingForEnergySystem } from "../services/AlgorithmTimingService";

export default async function cronLoader(): Promise<void> {
  const energySystemsWithTiming = await getEnergySystemsWithTiming();
  energySystemsWithTiming.forEach((es) => {
    try {
      setTimingForEnergySystem(es);
    } catch (e) {
      console.warn(e);
    }
  });
}
