import config from "../config";
import axios from "axios";

export default class OpenWeatherMap {
  private static instance: OpenWeatherMap;
  private static baseUrl = "https://api.openweathermap.org";

  apiKey: string;

  private constructor(apiKey: string | undefined) {
    if (!apiKey) throw new Error("OpenWeatherMap api key undefined!");
    this.apiKey = apiKey;
  }

  public static getInstance(): OpenWeatherMap {
    if (!OpenWeatherMap.instance) {
      OpenWeatherMap.instance = new OpenWeatherMap(config.openWeatherApiKey);
    }
    return OpenWeatherMap.instance;
  }

  public async getHourlyForecastForLocation(
    latitude: number,
    longitude: number
  ): Promise<any> {
    const forecast = await axios.get(
      `${OpenWeatherMap.baseUrl}/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,daily,alerts&appid=${this.apiKey}&units=metric`
    );
    return forecast;
  }
}
