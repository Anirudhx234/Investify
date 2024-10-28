import { useParams } from "wouter";
import { useAssetChartDataQuery } from "../api/assets.ts";
import { CandleChartComponent } from "../components/CandleChart.tsx";
import { LineChartComponent } from "../components/LineChart.tsx";
import twMerge from "../util/twMerge.ts";
import { useMemo, useState } from "react";
import { FiSettings } from "react-icons/fi";
import Assets from "../types/Assets";
import { MdErrorOutline } from "react-icons/md";

/* supported intervals */
const intervals: string[] = ["1min", "5min", "15min", "1h", "4h", "1D"];

export default function AssetPageChart() {
  const params = useParams() as { type: Assets.Type; symbol: string };

  const assetType = params.type;
  const assetSymbol = params.symbol;

  const [selectedInterval, setSelectedInterval] = useState("1min");
  const [isCandleChart, setIsCandleChart] = useState(false);
  const [showMovingAverage, setShowMovingAverage] = useState(false);
  const [maPeriod, setMaPeriod] = useState(5);

  const { data, isError, error, isLoading } = useAssetChartDataQuery({
    type: assetType,
    symbol: assetSymbol,
    interval: selectedInterval,
  });

  const errorMssg = error?.message;

  const cleanedData = useMemo(
    () => (data ? [...data.values].reverse() : data),
    [data],
  );

  if (isError) {
    return (
      <div className="flex items-center gap-1 text-error">
        <MdErrorOutline />
        <p>{errorMssg}</p>
      </div>
    );
  }

  if (isLoading || !cleanedData) {
    return (
      <div className="flex items-center gap-2">
        <span className="loading loading-spinner"></span>Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <h2>{assetSymbol}</h2>

      <div className={twMerge("w-full", !isCandleChart && "hidden")}>
        <CandleChartComponent
          data={cleanedData}
          showMA={showMovingAverage}
          timePeriod={maPeriod}
        />
      </div>

      <div className={twMerge("w-full", isCandleChart && "hidden")}>
        <LineChartComponent data={cleanedData} />
      </div>

      <div className="mt-4 flex flex-row justify-center">
        <div className="join flex-1">
          {intervals.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedInterval(period)}
              className={twMerge(
                "btn join-item",
                selectedInterval === period ? "btn-primary" : "btn-outline",
              )}
            >
              {period}
            </button>
          ))}
        </div>

        {isCandleChart && (
          <div className="dropdown dropdown-left dropdown-hover z-1 mb-4">
            <label tabIndex={0} className="btn btn-outline btn-sm">
              Moving Average
              <FiSettings />
            </label>
            <div
              tabIndex={0}
              className="dropdown-content w-52 rounded-box bg-base-100 p-4 shadow"
            >
              <label className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  checked={showMovingAverage}
                  onChange={(e) => setShowMovingAverage(e.target.checked)}
                  className="checkbox checkbox-sm mr-2"
                />
                Enable Moving Average
              </label>
              <div className="mt-2 flex items-center">
                <label className="mr-2">Period:</label>
                <input
                  type="range"
                  min="5"
                  max="200"
                  value={maPeriod}
                  onChange={(e) => setMaPeriod(Number(e.target.value))}
                  className="range range-xs"
                />
                <span className="ml-2">{maPeriod}</span>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsCandleChart(!isCandleChart)}
          className="btn btn-secondary mx-2"
        >
          {isCandleChart ? "Line Chart" : "CandleStick Chart"}
        </button>
      </div>
    </div>
  );
}
