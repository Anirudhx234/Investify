export default function routeToText(route: string) {
  const sections = route.split("/");
  if (sections[0]) return sections[0];
  return sections[1].replace("-", " ");
}
