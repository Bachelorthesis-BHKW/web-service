//Dieses Modul liest die Wetterprognose aus einem .xlsx-sheet ein und schreibt
//die Daten in die Datenbank

//Importieren der benötigten Funktionen
import {
    WeatherForecast,
    WeatherForecastCreateAttributes,
  } from "../models/WeatherForecast";
import { getCircularBufferPointerForEnergySystem } from "./CircularBufferPointerService";
import { EnergySystem } from "../models/EnergySystem";
//dieses noch erstellen!
import { getHourlyForecastFromXlsx } from "./helpers/convertXlsx2JsonHelper"

//Erstelle ein JSON-Objekt nach dem Modell für den Forecast
//mit dem aktuellen Bufferpointer und schreibe sie in die Datenbank
async function createWeatherForecast(
    weatherForecast: WeatherForecastCreateAttributes,
    energySystemId: number
  ): Promise<void> {
    const bufferPointer = await getCircularBufferPointerForEnergySystem(
      energySystemId
    );
    if (bufferPointer.weatherForecastPointer >= bufferPointer.maxWeatherForecast)
      bufferPointer.weatherForecastPointer = 0;
  
    await WeatherForecast.upsert({
      ...weatherForecast,
      energySystemId: energySystemId,
      bufferIndex: bufferPointer.weatherForecastPointer,
    });
  
    bufferPointer.weatherForecastPointer++;
    await bufferPointer.save();
    return;
  }

  //Führe die Funktion für das Lesen des Mail-Forecasts aus, iteriere durch
  //die Einträge und rufe für jeden Eintrag die Funktion
  //zum Schreiben in die Datenbank auf
  export async function fetchHourlyWeatherFromXlsxForEnergySystem(
    energySystem: EnergySystem
  ): Promise<void> {
    const hourlyForecast = await getHourlyForecastFromXlsx(
      //!!hier Parameter der,
      //Funktion eintragen!
    );
    //warum hier .hourly? Richtiges Datum implementieren!
    for (const hour of hourlyForecast.hourly)
      await createWeatherForecast(
        { date: new Date(hour.dt * 1000), temperature: hour.temp, globalHorizontalIrradiance: hour.rad },
        energySystem.energySystemId
      );
  }