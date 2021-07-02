import MainEventEmitter, { Events } from "./MainEventEmitter";
import { fetchHourlyWeatherForEnergySystem } from "../services/WeatherForecastService";
import { EnergySystem } from "../models/EnergySystem";
import ControlAlgorithmHelper from "../helpers/ControlAlgorithmHelper";

export function subscribeToRunAlgorithm(emitter: MainEventEmitter): void {
  emitter.on(Events.RUN_ALGORITHM, async (energySystem: EnergySystem) => {
    await fetchHourlyWeatherForEnergySystem(energySystem);
    await ControlAlgorithmHelper.runWithEnergySystem(energySystem);
  });
}
