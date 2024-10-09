import { useAssetsListQuery } from "../api/assets";
import AssetsTabList from "../scenes/AssetsTabList";
import SearchBar from "../scenes/SearchBar";

export default function AssetsRoute() {
  const { isLoading, isError, error, isSuccess } = useAssetsListQuery();
  const errorMssg = error?.message ?? "An error occurred";

  return (
    <div className="flex w-full flex-col items-center">
      <AssetsTabList />
      {isLoading && (
        <div className="flex items-center gap-2">
          <span className="loading loading-spinner loading-lg"></span>
          <p>Loading assets...</p>
        </div>
      )}
      {isError && (
        <div className="text-base text-error">
          Couldn't fetch assets ({errorMssg})
        </div>
      )}
      {isSuccess && <SearchBar />}
      {isSuccess && <div className="divider"></div>}
    </div>
  );
}
