export function getLastPartOfUrl(url: string): string {
  const parts = url.replace(/\/+$/, "").split("/");
  return parts[parts.length - 1].replace("-", " ");
}
