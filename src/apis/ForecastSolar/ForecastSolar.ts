import config from "../../config";
import axios from "axios";
import ForecastSolarResponse from "./ForecastSolarResponse";

export default class ForecastSolar {
  private static instance: ForecastSolar;
  private static baseUrl = "https://api.forecast.solar";

  // private constructor() {
  // }

  public static getInstance(): ForecastSolar {
    if (!ForecastSolar.instance) {
      ForecastSolar.instance = new ForecastSolar();
    }
    return ForecastSolar.instance;
  }

  public async getHourlyForecastForPVSystem(
    latitude: number,
    longitude: number,
    declination: number,
    azimuth: number,
    powerKWP: number
  ): Promise<ForecastSolarResponse> {
    const response = await axios.get(
      `${ForecastSolar.baseUrl}/estimate/${latitude}/${longitude}/${declination}/${azimuth}/${powerKWP}`
    );
    return response.data;
  }
}
