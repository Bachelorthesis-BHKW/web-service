
import { saveMailAttachments } from "./helpers/saveMailAttachments";
import { fetchHourlyWeatherFromXlsxForEnergySystem } from "./services/weatherForeacastMailService"

export function writeMailDataIntoDB() {
//Mails von heute abrufen und Anhänge speichern
await(saveMailAttachments());
//weather-Forecast auslesen, als JSON zur Verfügung stellen und in Datenbank schreiben
await(fetchHourlyWeatherFromXlsxForEnergySystem(energySystem);
//consumptions auslesen, als JSON zur Verfügung stellen und in Datenbank schreiben
    //erstellen:    getConsumptionsFromXlsx()
    //integrieren:  addConsumptionsToES(consumptions, energySystem.energySystemId) (Aus ESconsumptionService)
//currents auslesen, als JSON zur Verfügung stellen und in Datenbank schreiben
    //erstellen:    getCurrentsFromXlsx()
    //integrieren:  addESComponentCurrentsToESComponent(componentID, currents) (Aus ESComponentCurrentService)
}