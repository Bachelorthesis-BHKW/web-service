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
import { ESScheduleHistoric } from "../models/historic/ESScheduleHistoric";

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

async function archiveESComponentCurrentsForEnergySystem(
  energySystem: EnergySystem
): Promise<void> {
  const components = await energySystem.getESComponents();
  const combinedCurrents: ESComponentCurrent[] = [];
  for (const component of components) {
    const currents = await getAllCurrentsBetweenDateInterval(
      getPreviousDayIntervalForDate(new Date()),
      component
    );
    combinedCurrents.push(...currents);
  }
  const currentsData = combinedCurrents.map(
    (current) => current.toJSON() as ESComponentCurrentCreateAttributes
  );
  await ESComponentCurrentHistoric.bulkCreate(currentsData);
}

async function archiveESSchedulesForEnergySystem(
  energySystem: EnergySystem
): Promise<void> {
  const schedules = await energySystem.getESSchedules();
  for (const schedule of schedules) {
    const startDate = schedule.updatedAt;
    const scheduleArray: number[] = JSON.parse(schedule.schedule);
    for (let i = 0; i < scheduleArray.length; i++) {
      await ESScheduleHistoric.create({
        energySystemId: energySystem.energySystemId,
        esComponentId: schedule.esComponentId,
        scheduleStep: scheduleArray[i],
        date: new Date(
          startDate.getTime() + schedule.timeIntervalMin * 60 * 1000 * i
        ),
      });
    }
  }
}

async function archiveDataForEnergySystem(
  energySystem: EnergySystem
): Promise<void> {
  await archiveESConsumptionsForEnergySystem(energySystem);
  await archiveESComponentCurrentsForEnergySystem(energySystem);
  await archiveESSchedulesForEnergySystem(energySystem);
}

export async function archiveEnergySystemData(): Promise<void> {
  const energySystems = await EnergySystem.findAll();
  for (const energySystem of energySystems) {
    await archiveDataForEnergySystem(energySystem);
  }
}
