import type { assetTypes } from "../types";
import type { ISeriesApi } from "lightweight-charts";

import { useAssetPriceHistoryQuery } from "../api/assets";
import { useAppSelector } from "../hooks/useAppSelector";
import { useEffect, useRef } from "react";
import { createChart, ColorType } from "lightweight-charts";
import { convertToUnixTimestamp } from "../util/convertToUnixTimestamp";
import { useToastForRequest } from "../hooks/useToastForRequests";

export function LineChart({
  symbol,
  interval,
}: {
  symbol: string;
  interval: assetTypes.Interval;
}) {
  const theme = useAppSelector((state) => state.theme.mode);
  const dark = theme === "dark";

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);
  const dataIdxRef = useRef<number>(0);

  const priceHistoryState = useAssetPriceHistoryQuery({
    interval,
    symbol,
  });

  const data = priceHistoryState.data;

  useToastForRequest(`${symbol} Price History`, priceHistoryState, {
    backupSuccessMessage: `Retrieved ${symbol} price history!`,
  });

  /* set up chart */
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

    const series = chart.addAreaSeries();
    seriesRef.current = series;

    chart.timeScale().fitContent();
    setTimeout(handleResize, 0);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  /* reset data */
  useEffect(() => {
    if (chartContainerRef.current === null) return;
    if (chartRef.current === null) return;
    if (seriesRef.current === null) return;

    seriesRef.current.setData([]);
    dataIdxRef.current = 0;

    chartRef.current.timeScale().fitContent();
  }, [symbol, interval]);

  /* update data */
  useEffect(() => {
    if (chartContainerRef.current === null) return;
    if (chartRef.current === null) return;
    if (seriesRef.current === null) return;

    const series = seriesRef.current;

    if (data) {
      let i = dataIdxRef.current;

      for (; i < data.length; i++) {
        const d = data[i];
        console.log(d);
        series.update({
          time: convertToUnixTimestamp(d.datetime),
          value: "price" in d ? d.price : d.close,
        });
      }

      dataIdxRef.current = i;
    }

    chartRef.current.timeScale().fitContent();
  }, [data]);

  /* update window */
  useEffect(() => {
    if (chartContainerRef.current === null) return;
    if (chartRef.current === null) return;
    chartRef.current.timeScale().fitContent();
  }, [symbol, interval]);

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
    <div className="relative z-0 aspect-[2/1] w-full">
      <div
        ref={chartContainerRef}
        className="h-full w-full overflow-hidden rounded-lg border-2 border-base-300 shadow"
      />
    </div>
  );
}
