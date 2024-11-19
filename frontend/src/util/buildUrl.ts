export function buildUrl(url: string, search?: string | object | undefined) {
  if (!search) return url;

  if (typeof search === "string") {
    return `${url}?${search}`;
  }

  const queryString = new URLSearchParams(
    Object.entries(search)
      .filter((entry) => entry !== undefined && entry !== null)
      .map((entry) => [entry[0], `${entry[1]}`]),
  ).toString();

  return queryString ? `${url}?${queryString}` : url;
}
