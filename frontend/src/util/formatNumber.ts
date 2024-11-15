export function formatNumber(inp: number | string): string {
  let num = typeof inp === "number" ? inp : parseFloat(inp);
  let sign = 0;

  if (num > 0) sign = 1;
  if (num < 0) sign = -1;

  num *= sign;

  if (num >= 1_000_000_000_000) {
    return ((sign * num) / 1_000_000_000_000).toFixed(2) + "T";
  } else if (num >= 1_000_000_000) {
    return ((sign * num) / 1_000_000_000).toFixed(2) + "B";
  } else if (num >= 1_000_000) {
    return ((sign * num) / 1_000_000).toFixed(2) + "M";
  } else if (num >= 1_000) {
    return ((sign * num) / 1_000).toFixed(2) + "K";
  } else {
    return (sign * num).toFixed(2);
  }
}
