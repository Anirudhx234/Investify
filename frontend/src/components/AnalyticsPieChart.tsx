import { useParams } from "wouter";
import { useSectorValuationsQuery } from "../api/portfolio";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { convertToTitleCase } from "../util/convertToTitleCase";
import { convertAssetTypeToLabel } from "../util/convertAsset";
import { chartColors } from "./AnalyticsChartColors";

export function AnalyticsPieChart() {
  const params = useParams() as { id: string };
  const { id } = params;
  const { data } = useSectorValuationsQuery({ portfolioId: id });

  const valuations = Object.entries(data || {}).map(([name, value]) => ({
    name,
    value,
  }));

  if (valuations.length === 0) return <p className="italic">No assets yet</p>;

  return (
    <div className="flex w-full justify-center">
      <ResponsiveContainer width="100%" aspect={1.5}>
        <PieChart >
          <Pie
            data={valuations}
            nameKey="name"
            dataKey="value"
            label={({ name }) =>
              convertToTitleCase(convertAssetTypeToLabel(name))
            }
          >
            {valuations.map((entry, idx) => (
              <Cell
                key={entry.name}
                fill={chartColors[idx % chartColors.length]}
              />
            ))}
          </Pie>

          <Tooltip
            content={({ payload, active }) => {
              if (active && payload && payload.length) {
                const { value } = payload[0];
                return (
                  <div className="relative inline-block rounded p-1">
                    <p className="relative rounded bg-primary px-2 py-1 text-sm font-semibold text-primary-content shadow-md after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:border-[6px] after:border-x-transparent after:border-b-primary after:border-t-transparent after:content-['']">
                      Value: ${value}
                    </p>
                  </div>
                );
              }
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
