import config from "../config";

export function logIfDev(message: string): void {
  if (config.nodeEnv == "development") console.log(message);
}
