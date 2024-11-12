import { ColorType, createChart } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import convertToUnixTimestamp from "../util/convertToUnixTimestamp.ts";
import { useAssetLivePriceDataQuery } from "../api/assets.ts";
import { MdErrorOutline } from "react-icons/md";
import useAppSelector from "../hooks/useAppSelector.ts";

export function LineChartComponent({
  symbol,
  interval,
}: {
  symbol: string;
  interval: string;
}) {
  const theme = useAppSelector((state) => state.theme.mode);
  const dark = theme === "dark";

  const { data, isLoading, isError, error } = useAssetLivePriceDataQuery({
    interval,
    symbol,
  });

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const seriesRef = useRef<unknown>(null);
  const dataIdxRef = useRef<number>(0);

  const [chartProgress, setChartProgress] = useState(false);

  /* set up the chart */
  useEffect(() => {
    if (chartContainerRef.current === null) return;
    if (!chartProgress) return;

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
    seriesRef.current = null;
    chart.timeScale().fitContent();

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
    series.setData([]);

    setChartProgress(true);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [chartProgress]);

  /* reset data */
  useEffect(() => {
    if (chartContainerRef.current === null) return;
    if (chartRef.current === null) return;
    if (!chartProgress) return;

    const series = seriesRef.current as ReturnType<
      typeof chartRef.current.addAreaSeries
    >;

    series.setData([]);
    dataIdxRef.current = 0;
  }, [symbol, interval, chartProgress]);

  /* update data */
  useEffect(() => {
    if (chartContainerRef.current === null) return;
    if (chartRef.current === null) return;
    if (!chartProgress) return;

    const series = seriesRef.current as ReturnType<
      typeof chartRef.current.addAreaSeries
    >;

    if (data) {
      let i = dataIdxRef.current;

      for (; i < data.length; i++) {
        const d = data[i];
        series.update({
          time: convertToUnixTimestamp(d.datetime),
          value: "price" in d ? d.price : d.close,
        });
      }

      dataIdxRef.current = i;
    }
  }, [data, chartProgress]);

  /* update window */
  useEffect(() => {
    if (chartContainerRef.current === null) return;
    if (chartRef.current === null) return;
    if (!chartProgress) return;
    chartRef.current.timeScale().fitContent();
  }, [symbol, interval, chartProgress]);

  /* update theme */
  useEffect(() => {
    if (chartContainerRef.current === null) return;
    if (chartRef.current === null) return;
    if (!chartProgress) return;

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
  }, [dark, chartProgress]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <span className="loading loading-spinner"></span>
        Loading...
      </div>
    );
  }

  if (isError) {
    const errorMssg = error?.message;
    return (
      <div className="flex items-center gap-1 text-error">
        <MdErrorOutline />
        <span>{errorMssg}</span>
      </div>
    );
  }

  return (
    <div className="relative flex aspect-[2/1] w-full items-center justify-center">
      {!chartProgress && (
        <button
          className="btn btn-primary z-1"
          onClick={() => setChartProgress(true)}
        >
          Initialize Chart
        </button>
      )}
      <div
        ref={chartContainerRef}
        className="absolute left-0 top-0 h-full w-full overflow-hidden rounded-lg border-2 border-base-300 shadow"
      />
    </div>
  );
}
