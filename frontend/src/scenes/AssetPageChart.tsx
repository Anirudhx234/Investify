import type { assetTypes } from "../types";

import { useState } from "react";
import { twMerge } from "../util/twMerge";
import { useParams, useRoute } from "wouter";
import { FiSettings } from "react-icons/fi";
import { CandleChart } from "../components/CandleChart";
import { LineChart } from "../components/LineChart";

/* supported intervals */
const intervals: assetTypes.Interval[] = [
  "1min",
  "5min",
  "15min",
  "1h",
  "4h",
  "1day",
];

export function AssetPageChart() {
  const params = useParams() as { type: string; symbol: string };
  const symbol = params.symbol;

  const [selectedInterval, setSelectedInterval] =
    useState<assetTypes.Interval>("1min");

  const [isCandleChart] = useRoute("/candle-chart");

  const [showMovingAverage, setShowMovingAverage] = useState(false);
  const [maPeriod, setMaPeriod] = useState(5);

  return (
    <div className="flex flex-col">
      <div className="w-full">
        {isCandleChart ? (
          <CandleChart
            showMA={showMovingAverage}
            timePeriod={maPeriod}
            symbol={symbol}
            interval={selectedInterval}
          />
        ) : (
          <LineChart symbol={symbol} interval={selectedInterval} />
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
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
          <div className="dropdown lg:dropdown-right dropdown-hover z-1">
            <button tabIndex={0} className="btn btn-outline btn-sm">
              Moving Average
              <FiSettings />
            </button>

            <div
              tabIndex={0}
              className="dropdown-content w-52 rounded-box border border-neutral bg-base-100 p-4"
            >
              <label className="mb-2 flex items-center">
                <input
                  id="moving-average"
                  type="checkbox"
                  checked={showMovingAverage}
                  onChange={(e) => setShowMovingAverage(e.target.checked)}
                  className="checkbox checkbox-sm mr-2"
                />
                Enable Moving Average
              </label>

              <div className="mt-2 flex items-center">
                <label className="mr-2" htmlFor="time-period">
                  Period:
                </label>
                <input
                  id="time-period"
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

      <div className="h-40"></div>
    </div>
  );
}
