import type { assetTypes } from "../types";
import type { ISeriesApi, Time } from "lightweight-charts";

import { useAssetTimeSeriesQuery } from "../api/assets";
import { useAppSelector } from "../hooks/useAppSelector";
import { useEffect, useMemo, useRef } from "react";
import { ColorType, createChart } from "lightweight-charts";
import { convertToUnixTimestamp } from "../util/convertToUnixTimestamp";
import { useToastForRequest } from "../hooks/useToastForRequests";

function parseQueryData(data: assetTypes.TimeSeriesEntry[] | undefined) {
  return (
    data?.map((d) => ({
      ...d,
      time: convertToUnixTimestamp(d.datetime),
    })) ?? []
  );
}

function calculateMASeriesData(
  candleData: ReturnType<typeof parseQueryData>,
  maLength: number,
) {
  const maData = [];
  let prev = 0 as Time;

  for (let i = 0; i < candleData.length; i++) {
    const t = candleData[i].time;
    if (t < prev) {
      continue;
    }

    prev = t;
    if (i < maLength) {
      // Provide whitespace data points until the MA can be calculated
      maData.push({ time: t });
    } else {
      // Calculate the moving average, slow but simple way
      let sum = 0;
      for (let j = 0; j < maLength; j++) {
        sum += candleData[i - j].close;
      }
      const maValue = sum / maLength;
      maData.push({ time: t, value: maValue });
    }
  }

  return maData;
}

export interface ChartComponentProps {
  symbol: string;
  interval: assetTypes.Interval;
  showMA: boolean;
  timePeriod: number;
}

export function CandleChart({
  symbol,
  interval,
  showMA,
  timePeriod,
}: ChartComponentProps) {
  const theme = useAppSelector((state) => state.theme.mode);
  const dark = theme === "dark";

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const maSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const timeSeriesState = useAssetTimeSeriesQuery({ symbol, interval });
  const { data, refetch } = timeSeriesState;

  useToastForRequest(`${symbol} Time Series`, timeSeriesState, {
    backupSuccessMessage: `Retrieved ${symbol} time series!`,
  });

  const parsedData = useMemo(() => parseQueryData(data), [data]);

  /* set up the chart */
  useEffect(() => {
    if (chartContainerRef.current === null) return;

    const chartContainer = chartContainerRef.current;
    const chart = createChart(chartContainer, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
      },
    });

    chartRef.current = chart;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    candleSeriesRef.current = chart.addCandlestickSeries();
    maSeriesRef.current = chart.addLineSeries();

    chart.timeScale().fitContent();
    setTimeout(handleResize, 0);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [refetch]);

  /* reset candle data */
  useEffect(() => {
    if (chartContainerRef.current === null) return;
    if (chartRef.current === null) return;
    if (candleSeriesRef.current === null) return;

    candleSeriesRef.current.setData(parsedData);
  }, [parsedData]);

  /* reset ma data */
  useEffect(() => {
    if (chartContainerRef.current === null) return;
    if (chartRef.current === null) return;
    if (maSeriesRef.current === null) return;

    if (!showMA) {
      maSeriesRef.current.setData([]);
    } else {
      maSeriesRef.current.setData(
        calculateMASeriesData(parsedData, timePeriod),
      );
    }
  }, [parsedData, showMA, timePeriod]);

  /* update theme */
  useEffect(() => {
    if (chartContainerRef.current === null) return;
    if (chartRef.current === null) return;

    chartRef.current.applyOptions({
      layout: {
        background: {
          type: ColorType.Solid,
          color: dark ? "#1d232a" : "#ffffff",
        },
        textColor: dark ? "#a6adbb" : "#1f2937",
      },
      grid: {
        vertLines: { color: dark ? "#3a3a3a" : "#e0e0e0" },
        horzLines: { color: dark ? "#3a3a3a" : "#e0e0e0" },
      },
    });
  }, [dark]);

  return (
    <>
      <button className="m-1 text-sm" onClick={refetch}>
        Click Here To Reload Data
      </button>
      <div className="relative z-0 aspect-[2/1] w-full">
        <div
          ref={chartContainerRef}
          className="h-full w-full overflow-hidden rounded-lg border-2 border-base-300 shadow"
        />
      </div>
    </>
  );
}
