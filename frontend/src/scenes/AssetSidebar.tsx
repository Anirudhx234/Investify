import { LinksList } from "../components/LinksList";
import { selectIsLoggedIn } from "../features/clientSlice";
import { useAppSelector } from "../hooks/useAppSelector";

const options = ["/general", "/line-chart", "/candle-chart", "/news"];
const loggedInOptions = [...options, "/portfolio"];
export function AssetSidebar() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return <LinksList links={isLoggedIn ? loggedInOptions : options} />;
}
