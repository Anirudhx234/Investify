import { Redirect, Route, Switch } from "wouter";
import SearchBar from "../scenes/SearchBar";
import AssetPage from "./AssetPage";
import MarketMovers from "../scenes/MarketMovers";

export default function AssetsPage() {
  return (
    <Switch>
      <Route path="/" component={SearchPage} />
      <Route path="/:type/:symbol" component={AssetPage} />
      <Route path="*" component={() => <Redirect to="/" />} />
    </Switch>
  );
}

function SearchPage() {
  return (
    <div className="mt-12 flex w-full flex-col items-center gap-12">
      <SearchBar />
      <MarketMovers />
    </div>
  );
}
