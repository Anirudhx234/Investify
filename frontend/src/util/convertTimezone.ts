export function convertUTCToLocalTime(utc: string) {
  if (utc.includes(".")) utc = utc.substring(0, utc.indexOf("."));
  if (!utc.endsWith("Z")) utc += ".000Z";
  const utcDate = new Date(utc);
  const localDate = utcDate
    .toLocaleString("sv-SE", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    })
    .replace(" ", "T");
  return localDate;
}

export function convertLocalTimeToUTC(local: string) {
  const localDate = new Date(local);
  return localDate.toISOString();
}
