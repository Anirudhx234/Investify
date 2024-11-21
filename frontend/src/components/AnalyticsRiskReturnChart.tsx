import { useRiskReturnsQuery } from "../api/portfolio";
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartColors } from "./AnalyticsChartColors";
import { convertAssetTypeToLabel } from "../util/convertAsset";
import { convertToTitleCase } from "../util/convertToTitleCase";

export function AnalyticsRiskReturnChart({ id }: { id: string }) {
  const { data } = useRiskReturnsQuery({ portfolioId: id });

  if (!data?.length) return <p className="italic">No assets yet</p>;

  return (
    <div className="flex w-full justify-center">
      <ResponsiveContainer width="100%" aspect={1.5}>
        <ScatterChart margin={{ top: 20, left: 20, bottom: 20, right: 20 }}>
          <CartesianGrid />

          <XAxis
            type="number"
            dataKey="risk"
            name="Risk"
            unit="%"
            label={{
              value: "Risk (%)",
              position: "insideBottomRight",
              offset: -10,
            }}
          />

          <YAxis
            type="number"
            dataKey="return"
            name="Return"
            unit="%"
            label={{ value: "Return (%)", angle: -90, position: "insideLeft" }}
          />

          {data.map((entry, idx) => (
            <Scatter
              key={entry.name}
              data={[entry]}
              shape="square"
              fill={chartColors[idx % chartColors.length]}
            />
          ))}

          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const { name, risk, return: returnValue } = payload[0].payload;

                return (
                  <div className="rounded bg-base-100 p-2 shadow-md">
                    <p>
                      <strong>
                        {convertToTitleCase(convertAssetTypeToLabel(name))}
                      </strong>
                    </p>
                    <p>Risk: {risk}%</p>
                    <p>Return: {returnValue}%</p>
                  </div>
                );
              }
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
