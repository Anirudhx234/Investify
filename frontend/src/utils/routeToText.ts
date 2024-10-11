export default function routeToText(route: string) {
  const routeSegments = route.split("/");
  if (routeSegments[0]) return routeSegments[0].replace("-", " ");
  return routeSegments[1].replace("-", " ");
}
