import { EnergySystem } from "../models/EnergySystem";
import { saveMailAttachments } from "../helpers/saveMailAttachments";
import { saveFtpAttachments } from "../helpers/saveFtpAttachments";
import { createWeatherForecast } from "./WeatherForecastService";
import { XlsxToJson, XlsxToJsonTimestamp } from "../helpers/XlsxToJsonHelper";
import { addConsumptionsToES } from "./ESConsumptionService";
import { addESComponentCurrentsToESComponent } from "./ESComponentCurrentService";
import * as fs from "fs";
import moment from "moment";

export async function writeMailOrFtpDataIntoDB(
  energySystem: EnergySystem
): Promise<void> {
  return new Promise((resolve, reject) => {
    // Erzeuge Zeitstempel
    const monthNames = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    const today = new Date();
    const dateObj = new Date(today);
    dateObj.setDate(dateObj.getDate() - 1);
    const month = String(monthNames[dateObj.getMonth()]);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const year = String(dateObj.getFullYear());
    const file_date = String(day + month + year[2] + year[3]);
    // console.log(file_date);

    // Lösche temporäre Datei aus Verzeichnis
    try {
      const filePath =
        "./tmp/" + file_date + "_" + energySystem.inputFilename + ".xlsx";
      fs.unlinkSync(filePath);
      console.log("attachments deleted");
    } catch {
      console.log("no need for delete");
    }

    // Mail-/FTP-Daten von heute abrufen und Anhänge speichern
    const filenameExpression = new RegExp(energySystem.inputFilename+".*.xlsx?$")
    const downloadsinceDate = moment().format('YYYY-MM-DD'); // seit heute
    if (energySystem.mailInputTrigger) {
      saveMailAttachments(filenameExpression, downloadsinceDate)
        .then(function(filenames: string[]) {
          for (let i = 0; i<filenames.length; i++){
            console.log("Mail attachments saved as "+filenames[i]);
            onAttachmentsSaved(filenames[i]);
          }
        })
        .catch(function () {
          reject();
          console.log("Error saving mail attachments: Unsuccessful");
        });
    } else if (energySystem.ftpInputTrigger) {
      saveFtpAttachments(energySystem, file_date)
        .then(function(filename: string) {
          console.log("FTP data saved: Successful");
          onAttachmentsSaved(filename);
        })
        .catch(function () {
          reject();
          console.log("Error saving ftp attachments: Unsuccessful");
        });
    } else {
      console.log("Kommmunikation weder ueber Mail noch FTP-Server aktiv");
      reject();
    }

    async function onAttachmentsSaved(filename: string) {
      const xlsx_weather_data =
        "./tmp/" +
        "_weather_data" +
        filename +
        ".xlsx";
      const xlsx_data =
        "./tmp/" + filename;

      const cellrange_date = energySystem.zellbereich_date;
      const cellrange_consumptions = energySystem.zellbereich_consumptions;
      const cell_chp1_id = energySystem.zelle_chp1_id;
      const cellrange_chp1 = energySystem.zellbereich_chp1;
      const cell_chp2_id = energySystem.zelle_chp2_id;
      const cellrange_chp2 = energySystem.zellbereich_chp2;
      const cell_tes_id = energySystem.zelle_tes_id;
      const cellrange_tes = energySystem.zellbereich_tes;

      try {
        // Wetterdaten auslesen, in JSON umwandeln und in DB speichern
        try {
          const forecast_1 = XlsxToJsonTimestamp(
            xlsx_weather_data,
            "Tabelle1",
            "A11:B58"
          );
          const forecast_2 = XlsxToJson(
            xlsx_weather_data,
            "Tabelle1",
            "C11:D58",
            ["temperature", "globalHorizontalIrradiance"]
          );
          const forecast = [];
          for (let i = 0; i < forecast_1.length; i++) {
            forecast[i] = Object.assign(forecast_1[i], forecast_2[i]);
          }
          // console.log(forecast);
          for (const hourlyForecast of forecast) {
            await createWeatherForecast(
              {
                date: hourlyForecast.date,
                temperature: hourlyForecast.temperature,
                globalHorizontalIrradiance:
                  hourlyForecast.globalHorizontalIrradiance,
              },
              energySystem.energySystemId
            );
          }
        } catch {
          console.log("no weather data available");
        }

        // Consumptions auslesen, als JSON zur Verfügung stellen und in Datenbank schreiben
        const consumptions_1 = XlsxToJsonTimestamp(
          xlsx_data,
          "Tabelle1",
          cellrange_date
        );
        const consumptions_2 = XlsxToJson(
          xlsx_data,
          "Tabelle1",
          cellrange_consumptions,
          [
            "verbrauchStrom",
            "verbrauchHeizung",
            "verbrauchBww",
            "aussentemperatur",
          ]
        );
        const consumptions = [];
        for (let i = 0; i < consumptions_1.length; i++) {
          //const timestamp = makeTimestamp(consumptions_1[i].date, consumptions_1[i].time);
          consumptions[i] = Object.assign(consumptions_1[i], consumptions_2[i]);
        }
        // console.log(consumptions)

        //const sheet_consumptions = 'consumptions';
        //const sheet_range_consumptions = 'A10:E110';
        //const sheet_headers_consumptions = ['date', 'verbrauchStrom', 'verbrauchHeizung', 'verbrauchBww', 'aussentemperatur'];
        //const consumptions = XlsxToJson(xlsx_data, sheet_consumptions, sheet_range_consumptions, sheet_headers_consumptions);

        await addConsumptionsToES(consumptions, energySystem.energySystemId);

        // Component Currents auslesen, als JSON zur Verfügung stellen und in Datenbank schreiben
        // BHKW 1
        await writeComponentCurrentsFromMailToDB(
          xlsx_data,
          "Tabelle1",
          cell_chp1_id,
          cellrange_date,
          cellrange_chp1,
          ["component_id"],
          ["betriebszustand"]
        );

        // BHKW 2
        try {
          await writeComponentCurrentsFromMailToDB(
            xlsx_data,
            "Tabelle1",
            cell_chp2_id,
            cellrange_date,
            cellrange_chp2,
            ["component_id"],
            ["betriebszustand"]
          );
        } catch {
          console.log("no second chp");
        }

        // TES
        await writeComponentCurrentsFromMailToDB(
          xlsx_data,
          "Tabelle1",
          cell_tes_id,
          cellrange_date,
          cellrange_tes,
          ["component_id"],
          ["speicherfuellstand"]
        );

        // SLK
        try {
          await writeComponentCurrentsFromMailToDB(
            xlsx_data,
            "component_currents_slk",
            "A2",
            "A10:B110",
            "C10:F110",
            ["component_id"],
            ["laufzeit"]
          );
        } catch {
          console.log("no slk");
        }

        // Lösche temporäre Datei aus Verzeichnis
        try {
          const filePath =
            "./tmp/" + file_date + "_" + energySystem.inputFilename + ".xlsx";
          fs.unlinkSync(filePath);
          console.log("attachments deleted");
        } catch {
          console.log("no need for delete");
        }
        resolve();
      } catch (err: any) {
        console.log("error writing mail attachments in DB");
        console.log(err);
        reject();
      } finally {
        // Lösche temporäre Datei aus Verzeichnis
        try {
          const filePath = "./tmp/" + filename;
          fs.unlinkSync(filePath);
          console.log("temporary mail attachments deleted");
        } catch {
          console.error("temporary file "+filename+" could not be deleted");
        }
      }
    }
  });
}

async function writeComponentCurrentsFromMailToDB(
  xlsx_data: string,
  sheet_currents: string,
  sheet_range_component_id: string,
  sheet_range_component_currents_1: string,
  sheet_range_component_currents_2: string,
  sheet_headers_component_id: string[],
  sheet_headers_component_currents_2: string[]
) {
  const component_id_json = XlsxToJson(
    xlsx_data,
    sheet_currents,
    sheet_range_component_id,
    sheet_headers_component_id
  );
  const component_id_string = JSON.stringify(component_id_json).substr(17);
  const component_id: number = parseInt(component_id_string);
  const component_currents_1 = XlsxToJsonTimestamp(
    xlsx_data,
    sheet_currents,
    sheet_range_component_currents_1
  );
  const component_currents_2 = XlsxToJson(
    xlsx_data,
    sheet_currents,
    sheet_range_component_currents_2,
    sheet_headers_component_currents_2
  );
  const component_currents = [];
  for (let i = 0; i < component_currents_1.length; i++) {
    const jsonHelp = { current: component_currents_2[i] };
    component_currents[i] = Object.assign(component_currents_1[i], jsonHelp);
  }
  // console.log(component_currents)
  await addESComponentCurrentsToESComponent(
    component_id,
    component_currents
  ).then(function () {
    console.log("Finished write " + sheet_currents + " to DB");
  });
}
