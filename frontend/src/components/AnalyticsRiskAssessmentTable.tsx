import { useRiskScoreQuery } from "../api/portfolio";
import { convertAssetTypeToLabel } from "../util/convertAsset";
import { formatNumber } from "../util/formatNumber";

export function AnalyticsRiskAssessmentTable({ id }: { id: string }) {
  const { data } = useRiskScoreQuery({ portfolioId: id });

  return (
    <div className="w-full max-w-[100vw] overflow-auto px-2">
      <table className="table-zebra-zebra w-full">
        <thead>
          <tr>
            <th className="w-1/3 py-2">Symbol</th>
            <th className="w-1/3 py-2">Type</th>
            <th className="w-1/3 py-2">Risk Score</th>
          </tr>
        </thead>
        <tbody>
          {data?.assetsByRisk.map((entry) => (
            <tr key={entry.portfolioAsset.id}>
              <th>{entry.portfolioAsset.asset.symbol}</th>

              <td className="text-center capitalize">
                {convertAssetTypeToLabel(entry.portfolioAsset.asset.type)}
              </td>

              <td className="text-center capitalize">
                {formatNumber(entry.riskScore)}
              </td>
            </tr>
          ))}
          {!data?.assetsByRisk.length && (
            <tr>
              <td colSpan={6} className="pb-4 pt-2 text-center italic">
                No assets yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
