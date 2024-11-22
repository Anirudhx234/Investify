import { useGetPaperPortfolioQuery } from "../api/portfolio";
import { convertAssetTypeToLabel } from "../util/convertAsset";
import { formatNumber } from "../util/formatNumber";

export function PaperPortfolioTradeHistoryTable({ id }: { id: string }) {
  const { data } = useGetPaperPortfolioQuery({ id });

  return (
    <div className="w-full max-w-[100vw] overflow-auto px-2">
      <table className="table-zebra-zebra w-full">
        <thead>
          <tr>
            <th className="w-1/7 py-2">DateTime</th>
            <th className="w-1/7 py-2">Symbol</th>
            <th className="w-1/7 py-2">Type</th>
            <th className="w-1/7 py-2">Buy/Sell</th>
            <th className="w-1/7 py-2">Price</th>
            <th className="w-1/7 py-2">Quantity</th>
            <th className="w-1/7 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {data?.trades.map((trade) => {
            const date = new Date(trade.time);

            return (
              <tr key={trade.id}>
                <td className="text-center">
                  {date.toLocaleDateString()} {date.toLocaleTimeString()}
                </td>

                <td className="text-center">{trade.asset.symbol}</td>

                <td className="text-center capitalize">
                  {convertAssetTypeToLabel(trade.asset.type)}
                </td>

                <td className="text-center">
                  {trade.type === "BUY" ? "B" : "S"}
                </td>

                <td className="text-center">{formatNumber(trade.price)}</td>
                <td className="text-center">{formatNumber(trade.quantity)}</td>
                <td className="text-center">
                  {formatNumber(trade.totalPortfolioValue)}
                </td>
              </tr>
            );
          })}
          {!data?.trades.length && (
            <tr>
              <td colSpan={7} className="pb-4 pt-2 text-center italic">
                No trades yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export function PaperPortfolioAssetsTable({ id }: { id: string }) {
  const { data } = useGetPaperPortfolioQuery({ id });

  return (
    <div className="w-full max-w-[100vw] overflow-auto px-2">
      <table className="table-zebra-zebra w-full">
        <thead>
          <tr>
            <th className="w-1/5 py-2">Symbol</th>
            <th className="w-1/5 py-2">Type</th>
            <th className="w-1/5 py-2">Average Cost</th>
            <th className="w-1/5 py-2">Current Price</th>
            <th className="w-1/5 py-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {data?.portfolioAssets?.map((portfolioAsset) => (
            <tr key={portfolioAsset.id}>
              <th>{portfolioAsset.asset.symbol}</th>

              <td className="text-center capitalize">
                {convertAssetTypeToLabel(portfolioAsset.asset.type)}
              </td>

              <td className="text-center">
                {formatNumber(portfolioAsset.averageCost)}
              </td>

              <td className="text-center">
                {formatNumber(portfolioAsset.currentPrice)}
              </td>

              <td className="text-center">
                {formatNumber(portfolioAsset.quantity)}
              </td>
            </tr>
          ))}
          {!data?.portfolioAssets?.length && (
            <tr>
              <td colSpan={6} className="pb-4 pt-2 text-center italic">
                No assets
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
