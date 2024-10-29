export default function buildUrl(
  url: string,
  queryParams?: object | undefined,
) {
  if (!queryParams) return url;

  const queryString = new URLSearchParams(
    Object.entries(queryParams)
      .filter((entry) => entry !== undefined && entry !== null)
      .map((entry) => [entry[0], `${entry[1]}`]),
  ).toString();

  return queryString ? `${url}?${queryString}` : url;
}
