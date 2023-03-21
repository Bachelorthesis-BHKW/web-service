import { EnergySystem } from "../models/EnergySystem";
import * as fs from "fs";
import { saveMailAttachments } from "../helpers/saveMailAttachments";
import { getAllConsumptionsBetweenDateInterval, updateConsumption} from "./ESConsumptionService";
import * as path from "path";
import { parse } from "csv";
import { ESConsumption } from "../models/ESConsumption";
import moment from "moment";

export async function writeElectricityPriceForecastIntoDB(
  energySystem: EnergySystem
): Promise<void> {
  return new Promise((resolve, reject) => {
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate());
    const downloadsinceDate = moment(dateObj).format('YYYY-MM-DD'); // seit heute
    const filenameExpression = new RegExp(energySystem.electricityPriceForecastFilename +".*.csv?$")

    // Mail von heute abrufen und Anhänge speichern
    saveMailAttachments(filenameExpression, downloadsinceDate)
      .then(function (filenames: string[]) {
        for (let i = 0; i<filenames.length; i++){
          console.log("Electricity price forecast saved as "+filenames[i]);
          onAttachmentsSaved(filenames[i]);
        }
      })
      .catch(function () {
        console.log("Error saving electricity price forecast");
        reject();
      });

    async function onAttachmentsSaved(filename: string) {
      //csv-Datei einlesen:
      const csv_data = "./tmp/"+filename;
        try {
          const csvFilePath = path.resolve(csv_data);
          const headers = ['date', 'price', 'unit'];
          const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

          type priceForecast = {
            date: Date;
            price: number;
            unit: string;
          };

          parse(fileContent, {
            delimiter: ';',
            fromLine: 2,
            columns: headers,
            cast: (columnValue, context) => {
              if (context.column === 'price') {
                columnValue = columnValue.replace(",",".");
                return parseFloat(columnValue);
              }
              if (context.column === 'date'){
                return new Date(columnValue + ":00.000 +00:00");
              }
              return columnValue;
            }
          }, async (error, forecasts: priceForecast[]) => {
            if (error) {
              console.error(error);
              reject();
            }

            //consumptions der letzten 24 Stunden aus Datenbank laden:
            const now = new Date();
            const intervalEnd = new Date(now.getTime() + 1000 * 60 * 60 * 24)
            const intervalStart = new Date(now.getTime() - 1000 * 60 * 60 * 24);
            const consumptions: ESConsumption[] = await getAllConsumptionsBetweenDateInterval(
              [intervalStart, intervalEnd],
              energySystem
            );

            //Stromverbrauch mit Strompreisprognose überschreiben:
            for (const consumption of consumptions) {
              for (const forecast of forecasts){
                const forecastDate = new Date (consumption.date.getTime() + 1000 * 60 * 60 * 24);
                if (forecastDate.getHours() == forecast.date.getHours() &&
                  forecastDate.getDate() == forecast.date.getDate()&&
                  forecastDate.getMonth() == forecast.date.getMonth()){
                  consumption.verbrauchStrom = forecast.price;
                  await updateConsumption(consumption, consumption.energySystemId, consumption.bufferIndex);
                }
              }
            }
          });
        resolve();
      } catch (err: any) {
        console.log("error writing mail electricity price forecast in DB");
        console.log(err);
        reject();
      } finally {
          // Lösche temporäre Datei aus Verzeichnis
          try {
            const filePath = "./tmp/" + filename;
            fs.unlinkSync(filePath);
            console.log("temporary electricity price forecast deleted");
          } catch {
            console.error("temporary file "+filename+" could not be deleted");
          }
      }
    }
   });
}
