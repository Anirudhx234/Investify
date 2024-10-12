import Asset from "../types/Asset";

export default function routeToAssetType(route: string) {
  const routeSegments = route.split("/");
  return routeSegments[routeSegments.length - 1] as Asset.Type;
}
