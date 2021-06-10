import axios from "axios";
import NominatimResponse from "./NominatimResponse";

export default class Nominatim {
  private static instance: Nominatim;
  private static baseUrl = "https://nominatim.openstreetmap.org";

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): Nominatim {
    if (!Nominatim.instance) {
      Nominatim.instance = new Nominatim();
    }
    return Nominatim.instance;
  }

  public async reverseLatLong(
    latitude: number,
    longitude: number
  ): Promise<NominatimResponse> {
    const response = await axios.get(
      `${Nominatim.baseUrl}/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=5&extratags=1`
    );
    return response.data;
  }
}
