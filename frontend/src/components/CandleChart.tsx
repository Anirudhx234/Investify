import { ColorType, createChart, Time } from "lightweight-charts";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import convertToUnixTimestamp from "../util/convertToUnixTimestamp.ts";
import { useAssetTimeSeriesDataQuery } from "../api/assets.ts";
import { MdErrorOutline } from "react-icons/md";
import useAppSelector from "../hooks/useAppSelector.ts";

interface ChartComponentProps {
  symbol: string;
  interval: string;
  showMA: boolean;
  timePeriod: number;
}

export const CandleChartComponent = ({
  symbol,
  interval,
  showMA,
  timePeriod,
}: ChartComponentProps) => {
  const theme = useAppSelector((state) => state.theme.mode);
  const dark = theme === "dark";

  const { data, isLoading, isError, error, refetch } =
    useAssetTimeSeriesDataQuery({ symbol, interval });

  const parsedData = useMemo(() => {
    return (
      data?.map((d) => ({
        ...d,
        time: convertToUnixTimestamp(d.datetime),
      })) ?? []
    );
  }, [data]);

  const calculateMovingAverageSeriesData = useCallback(
    (candleData: typeof parsedData, maLength: number) => {
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
    },
    [],
  );

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const maSeriesRef = useRef<unknown>(null);
  const candleSeriesRef = useRef<unknown>(null);

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
    maSeriesRef.current = null;
    candleSeriesRef.current = null;
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

    candleSeriesRef.current = chart.addCandlestickSeries();
    maSeriesRef.current = chart.addLineSeries();

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [refetch, chartProgress]);

  /* reset candle data */
  useEffect(() => {
    if (chartContainerRef.current === null) return;
    if (chartRef.current === null) return;
    if (!chartProgress) return;

    const candleSeries = candleSeriesRef.current as ReturnType<
      typeof chartRef.current.addAreaSeries
    > | null;

    candleSeries?.setData(parsedData);
  }, [parsedData, chartProgress]);

  /* reset ma data */
  useEffect(() => {
    if (chartContainerRef.current === null) return;
    if (chartRef.current === null) return;
    if (!chartProgress) return;

    const maSeries = maSeriesRef.current as ReturnType<
      typeof chartRef.current.addLineSeries
    > | null;

    if (!showMA) {
      maSeries?.setData([]);
    } else {
      maSeries?.setData(
        calculateMovingAverageSeriesData(parsedData, timePeriod),
      );
    }
  }, [
    parsedData,
    showMA,
    timePeriod,
    calculateMovingAverageSeriesData,
    chartProgress,
  ]);

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
    <>
      <button className="m-1 text-sm" onClick={() => refetch()}>
        Click Here To Reload Data
      </button>
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
    </>
  );
};
