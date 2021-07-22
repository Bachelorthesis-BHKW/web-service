import { EnergySystem } from "../models/EnergySystem";
import { ESConsumptionCreateAttributes } from "../models/ESConsumption";
import { ESConsumptionHistoric } from "../models/historic/ESConsumptionsHistoric";
import getPreviousDayIntervalForDate from "../helpers/getPreviousDayInterval";
import { getAllConsumptionsBetweenDateInterval } from "./ESConsumptionService";
import {
  ESComponentCurrent,
  ESComponentCurrentCreateAttributes,
} from "../models/ESComponentCurrent";
import { ESComponentCurrentHistoric } from "../models/historic/ESComponentCurrentHistoric";
import { getAllCurrentsBetweenDateInterval } from "./ESComponentCurrentService";

async function archiveESConsumptionsForEnergySystem(
  energySystem: EnergySystem
): Promise<void> {
  const consumptions = await getAllConsumptionsBetweenDateInterval(
    getPreviousDayIntervalForDate(new Date()),
    energySystem
  );
  const consumptionData = consumptions.map(
    (consumption) => consumption.toJSON() as ESConsumptionCreateAttributes
  );
  await ESConsumptionHistoric.bulkCreate(consumptionData);
}

export async function archiveESComponentCurrentsForEnergySystem(
  energySystem: EnergySystem
): Promise<void> {
  const components = await energySystem.getESComponents();
  const combinedCurrents: ESComponentCurrent[] = [];
  for (const component of components) {
    const currents = await getAllCurrentsBetweenDateInterval(
      getPreviousDayIntervalForDate(
        new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
      ),
      component
    );
    combinedCurrents.push(...currents);
  }
  const currentsData = combinedCurrents.map(
    (current) => current.toJSON() as ESComponentCurrentCreateAttributes
  );
  await ESComponentCurrentHistoric.bulkCreate(currentsData);
}
