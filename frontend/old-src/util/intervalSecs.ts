const secondsInMinute = 60;
const secondsInHour = 60 * secondsInMinute;
const secondsInDay = 24 * secondsInHour;

export default function intervalSecs(interval: string) {
  switch (interval) {
    case "1min":
      return secondsInMinute;
    case "5min":
      return 5 * secondsInMinute;
    case "15min":
      return 15 * secondsInMinute;
    case "30min":
      return 30 * secondsInMinute;
    case "45min":
      return 45 * secondsInMinute;
    case "1h":
      return secondsInHour;
    case "2h":
      return 2 * secondsInHour;
    case "4h":
      return 4 * secondsInHour;
    case "1day":
      return secondsInDay;
    default:
      throw new Error("Unsupported interval");
  }
}
