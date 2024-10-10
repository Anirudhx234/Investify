import { Route, Switch } from "wouter";
import { useAssetsListQuery } from "../api/assets";
import AssetsTabList from "../scenes/AssetsTabList";
import SearchBar from "../scenes/SearchBar";
import AssetPageRoute from "./AssetPageRoute";
import { MdErrorOutline } from "react-icons/md";

function BrowseAssets() {
  const { isFetching, isError, error, isSuccess } = useAssetsListQuery();
  const errorMssg = error?.message ?? "An error occurred";

  return (
    <div className="flex w-full flex-col items-center">
      <AssetsTabList />
      {isFetching && (
        <div className="flex items-center gap-2">
          <span className="loading loading-spinner loading-lg"></span>
          <p>Loading assets...</p>
        </div>
      )}
      {isError && (
        <div className="flex items-center gap-1 text-base text-error">
          <MdErrorOutline />
          <p>{errorMssg}</p>
        </div>
      )}
      {isSuccess && <SearchBar />}
    </div>
  );
}

export default function AssetsRoute() {
  return (
    <Switch>
      <Route path="/asset-page" component={AssetPageRoute} />
      <Route path="/*" component={BrowseAssets} />
    </Switch>
  );
}
