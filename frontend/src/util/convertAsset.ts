export function convertAssetTypeToRoute(type: string) {
  return type.toLowerCase().replace("_", "-");
}

export function convertAssetTypeToLabel(type: string) {
  return convertAssetTypeToRoute(type).replace("-", " ");
}

export function convertSymbolToRoute(symbol: string) {
  return symbol.replace(/\//g, "%2F");
}
