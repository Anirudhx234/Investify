import { createChart, Time } from "lightweight-charts";
import { useCallback, useEffect, useRef } from "react";
import convertToUnixTimestamp from "../util/convertToUnixTimestamp.ts";
import Assets from "../types/Assets";

interface ChartComponentProps {
  data: Assets.ChartDataEntry[];
  showMA: boolean;
  timePeriod: number;
}

export const CandleChartComponent = ({
  data,
  showMA,
  timePeriod,
}: ChartComponentProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null); // Update type to remove 'any'

  // Parse the data and update the time format
  const parsedData = data.map((d) => ({
    ...d,
    time: convertToUnixTimestamp(d.datetime),
  }));

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

  useEffect(() => {
    if (chartContainerRef.current == null) return;

    const chartContainer = chartContainerRef.current;
    const chart = createChart(chartContainer, {
      width: chartContainer.clientWidth || 300,
      height: chartContainer.clientHeight || 400, // Fallback height if no parent height
    });

    chartRef.current = chart;
    chart.timeScale().fitContent();

    if (showMA) {
      const maData = calculateMovingAverageSeriesData(parsedData, timePeriod);
      const maSeries = chart.addLineSeries({ color: "#2962FF", lineWidth: 3 });
      maSeries.setData(maData);
    }

    const newSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    newSeries.setData(parsedData);

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [parsedData, showMA, timePeriod, calculateMovingAverageSeriesData]);

  return <div ref={chartContainerRef} className="h-full w-full" />;
};
