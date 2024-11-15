import type { assetTypes } from "../types";

const secondsInMinute = 60;
const secondsInHour = 60 * secondsInMinute;
const secondsInDay = 24 * secondsInHour;

export function convertIntervalToSecs(interval: assetTypes.Interval) {
  switch (interval) {
    case "1min":
      return secondsInMinute;
    case "5min":
      return 5 * secondsInMinute;
    case "15min":
      return 15 * secondsInMinute;
    case "1h":
      return secondsInHour;
    case "4h":
      return 4 * secondsInHour;
    case "1day":
      return secondsInDay;
    default:
      return 0;
  }
}
