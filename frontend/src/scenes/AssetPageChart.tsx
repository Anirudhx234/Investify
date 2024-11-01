import { useParams } from "wouter";
import { CandleChartComponent } from "../components/CandleChart.tsx";
import { LineChartComponent } from "../components/LineChart.tsx";
import twMerge from "../util/twMerge.ts";
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import Assets from "../types/Assets";

/* supported intervals */
const intervals: string[] = ["1min", "5min", "15min", "1h", "4h", "1day"];

export default function AssetPageChart() {
  const params = useParams() as { type: Assets.Type; symbol: string };
  const symbol = params.symbol;

  const [selectedInterval, setSelectedInterval] = useState("1min");
  const [isCandleChart, setIsCandleChart] = useState(false);
  const [showMovingAverage, setShowMovingAverage] = useState(false);
  const [maPeriod, setMaPeriod] = useState(5);

  return (
    <div className="flex flex-col">
      <div className={twMerge("w-full", !isCandleChart && "hidden")}>
        <CandleChartComponent
          showMA={showMovingAverage}
          timePeriod={maPeriod}
          symbol={symbol}
          interval={selectedInterval}
        />
      </div>

      <div className={twMerge("w-full", isCandleChart && "hidden")}>
        <LineChartComponent symbol={symbol} interval={selectedInterval} />
      </div>

      <div className="mt-4 flex flex-wrap justify-between gap-4">
        <div className="flex gap-4 flex-wrap">
          <div className="join">
            {intervals.map((period) => (
              <button
                key={period}
                onClick={() => setSelectedInterval(period)}
                className={twMerge(
                  "btn join-item btn-sm lg:btn-md",
                  selectedInterval === period ? "btn-primary" : "btn-outline",
                )}
              >
                {period}
              </button>
            ))}
          </div>

          {isCandleChart && (
            <div className="dropdown dropdown-right dropdown-hover z-1">
              <label tabIndex={0} className="btn btn-outline btn-sm">
                Moving Average
                <FiSettings />
              </label>
              <div
                tabIndex={0}
                className="dropdown-content w-52 rounded-box bg-base-100 px-4 shadow"
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
        </div>

        <button
          onClick={() => setIsCandleChart(!isCandleChart)}
          className="btn btn-secondary btn-sm lg:btn-md"
        >
          {isCandleChart ? "Line Chart" : "CandleStick Chart"}
        </button>
      </div>
    </div>
  );
}
