import Nominatim from "../apis/Nominatim/Nominatim";
import { Region } from "feiertagejs";
import { EnergySystem } from "../models/EnergySystem";

const nominatim = Nominatim.getInstance();

export async function addRegionToEnergySystem(
  energySystem: EnergySystem
): Promise<void> {
  const nominatimResponse = await nominatim.reverseLatLong(
    energySystem.latitude,
    energySystem.longitude
  );
  energySystem.region = nominatimResponse.extratags.state_code as Region;
  await energySystem.save();
}
