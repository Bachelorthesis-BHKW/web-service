import {
  ESConsumption,
  ESConsumptionCreateAttributes,
} from "../models/ESConsumption";
import * as EnergySystemService from "./EnergySystemService";

export async function addConsumptionToES(
  consumption: ESConsumptionCreateAttributes,
  energySystemId: number
): Promise<void> {
  const energySystem = await EnergySystemService.getEnergySystemById(
    energySystemId
  );
  const newConsumption = await ESConsumption.create(consumption);
  await energySystem.addESConsumption([newConsumption]);
  return;
}
