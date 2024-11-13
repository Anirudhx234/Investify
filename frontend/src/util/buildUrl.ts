export default function buildUrl(
  url: string,
  search?: object | undefined,
) {
  if (!search) return url;

  const queryString = new URLSearchParams(
    Object.entries(search)
      .filter((entry) => entry !== undefined && entry !== null)
      .map((entry) => [entry[0], `${entry[1]}`]),
  ).toString();

  return queryString ? `${url}?${queryString}` : url;
}
