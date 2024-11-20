import { LinksList } from "../components/LinksList";

const items = ["/create", "/joined", "/browse"];
export function GamesSidebar() {
  return <LinksList links={items} />;
}
