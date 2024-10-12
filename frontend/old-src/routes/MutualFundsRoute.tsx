import { usePopularMutualFundsQuery } from "../api/assets"
import AssetsListBox from "../components/AssetsListBox";

export default function MutualFundsRoute() {
  const { isLoading, data, isError, error } = usePopularMutualFundsQuery();
  const errorMssg = error?.message;

  if (isLoading) {
    return <h2>Loading Data...</h2>;
  }

  if (isError) {
    return <h2 className="text-error">{errorMssg}</h2>;
  }

  return (
    <div className="grid w-full">
      <div className="flex flex-col gap-2 items-center">
        <h2>Top Funds</h2>
        {data && (
          <AssetsListBox
            data={{
              "mutual-funds": data.result.list,
              stocks: [],
              crypto: [],
              etfs: [],
            }}
            assetType="mutual-funds"
          />
        )}
      </div>
    </div>
  );
}