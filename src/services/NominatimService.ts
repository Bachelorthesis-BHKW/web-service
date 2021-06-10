import Nominatim from "../apis/Nominatim/Nominatim";
import { getEnergySystemById } from "./EnergySystemService";
import { Region } from "feiertagejs";

const nominatim = Nominatim.getInstance();

export async function addRegionToEnergySystem(
  energySystemId: number
): Promise<void> {
  const energySystem = await getEnergySystemById(energySystemId);
  const nominatimResponse = await nominatim.reverseLatLong(
    energySystem.latitude,
    energySystem.longitude
  );
  energySystem.region = nominatimResponse.extratags.state_code as Region;
  await energySystem.save();
}
