export default interface ForecastSolarResponse {
  result: Record<string, number>;
  message: {
    code: number;
    type: string;
    text: string;
    pid: string;
    info: {
      latitude: number;
      longitude: number;
      distance: number;
      place: string;
      timezone: string;
      time: string;
      time_utc: string;
    };
    ratelimit: {
      period: number;
      limit: number;
      remaining: number;
    };
  };
}
