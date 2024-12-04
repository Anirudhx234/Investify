import { LinksList } from "../components/LinksList";

const options = ["/general", "/line-chart", "/candle-chart", "/news"];
export function AssetSidebar() {
  return <LinksList links={options} />;
}
