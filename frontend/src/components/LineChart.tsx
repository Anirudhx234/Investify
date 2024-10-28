import { createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";
import convertToUnixTimestamp from "../util/convertToUnixTimestamp.ts";
import Assets from "../types/Assets";

interface ChartComponentProps {
  data: Assets.ChartDataEntry[];
}

export const LineChartComponent = ({ data }: ChartComponentProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null); // Update type to remove 'any'

  const parsedData = data.map((d) => ({
    time: convertToUnixTimestamp(d.datetime),
    value: d.close,
  }));

  useEffect(() => {
    if (chartContainerRef.current == null) return;

    const chartContainer = chartContainerRef.current;
    const chart = createChart(chartContainer, {
      width: chartContainer.clientWidth || 300,
      height: chartContainer.clientHeight || 400, // Fallback height if no parent height
    });

    chartRef.current = chart;
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor: "#2962FF",
      topColor: "#2962FF",
      bottomColor: "rgba(41, 98, 255, 0.28)",
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
  }, [parsedData]);

  return <div ref={chartContainerRef} className="h-full w-full" />;
};
