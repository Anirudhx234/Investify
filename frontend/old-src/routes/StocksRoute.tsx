import { usePopularStocksQuery } from "../api/assets";
import AssetsListBox from "../components/AssetsListBox";

export default function StocksRoute() {
  const { isLoading, data, isError, error } = usePopularStocksQuery();
  const errorMssg = error?.message;

  if (isLoading) {
    return <h2>Loading Data...</h2>;
  }

  if (isError) {
    return <h2 className="text-error">{errorMssg}</h2>;
  }

  return (
    <div className="grid w-full grid-cols-3">
      <div className="flex flex-col gap-2 items-center">
        <h2>Top Gainers</h2>
        {data && (
          <AssetsListBox
            data={{
              stocks: data.top_gainers.map((stock) => ({
                ...stock,
                name: stock.ticker,
                symbol: stock.ticker,
                type: "stocks"
              })),
              "mutual-funds": [],
              crypto: [],
              etfs: [],
            }}
            assetType="stocks"
          />
        )}
      </div>
      <div className="flex flex-col gap-2 items-center">
        <h2>Top Losers</h2>
        {data && (
          <AssetsListBox
            data={{
              stocks: data.top_losers.map((stock) => ({
                ...stock,
                name: stock.ticker,
                symbol: stock.ticker,
                type: "stocks"
              })),
              "mutual-funds": [],
              crypto: [],
              etfs: [],
            }}
            assetType="stocks"
          />
        )}
      </div>
      <div className="flex flex-col gap-2 items-center">
        <h2>Most Popular</h2>
        {data && (
          <AssetsListBox
            data={{
              stocks: data.most_actively_traded.map((stock) => ({
                ...stock,
                name: stock.ticker,
                symbol: stock.ticker,
                type: "stocks"
              })),
              "mutual-funds": [],
              crypto: [],
              etfs: [],
            }}
            assetType="stocks"
          />
        )}
      </div>
    </div>
  );
}
