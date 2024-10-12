import { usePopularCryptoQuery } from "../api/assets";
import AssetsListBox from "../components/AssetsListBox";

export default function ETFSRoute() {
  const { isLoading, data, isError, error } = usePopularCryptoQuery();
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
        <h2>Top Crypto</h2>
        {data && (
          <AssetsListBox
            data={{
              "mutual-funds": [],
              stocks: [],
              crypto: data.data,
              etfs: [],
            }}
            assetType="crypto"
          />
        )}
      </div>
    </div>
  );
}