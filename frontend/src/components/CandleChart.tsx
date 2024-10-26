interface ChartComponentProps {
    data: { time: string, open: number, high: number, low: number, close: number, volume: number}[];
    showMA?: boolean;
    timePeriod?: number
}

import {createChart, Time} from 'lightweight-charts';
import { useEffect, useRef } from 'react';
import convertToUnixTimestamp from "../utils/convertToUnixTimestamp.ts";


export const CandleChartComponent = ({data, showMA = false, timePeriod = 20}: ChartComponentProps) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<ReturnType<typeof createChart> | null>(null);  // Update type to remove 'any'

    // Parse the data and update the time format
    const parsedData = data.map((d) => ({
        time: convertToUnixTimestamp(d.time),
        open: d.open,
        high: d.high,
        low: d.low,
        close: d.close,
        volume: d.volume,
    }));

    function calculateMovingAverageSeriesData(candleData: { time: Time, open: number, high: number, low: number, close: number, volume: number}[], maLength: number) {
        const maData = [];

        let prev: Time = 0 as Time
        for (let i = 0; i < candleData.length; i++) {
            const t = candleData[i].time
            if (t < prev) {
                continue
            }
            prev = t
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

    useEffect(() => {
        if (chartContainerRef.current == null) return;

        const chartContainer = chartContainerRef.current;
        const chart = createChart(chartContainer, {
            width: chartContainer.clientWidth || 300,
            height: chartContainer.clientHeight || 400,  // Fallback height if no parent height
        });
        chartRef.current = chart;
        chart.timeScale().fitContent();

        if (showMA) {
            const maData = calculateMovingAverageSeriesData(parsedData, timePeriod);
            const maSeries = chart.addLineSeries({ color: '#2962FF', lineWidth: 3 });
            maSeries.setData(maData);
        }

        const newSeries = chart.addCandlestickSeries({ upColor: '#26a69a', downColor: '#ef5350', borderVisible: false, wickUpColor: '#26a69a', wickDownColor: '#ef5350' });
        newSeries.setData(parsedData);

        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.applyOptions({
                    width: chartContainerRef.current.clientWidth,
                    height: chartContainerRef.current.clientHeight,
                });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [parsedData, showMA, timePeriod]);

    return <div ref={chartContainerRef} className={"w-full h-full"}/>;
};

const initialData = [{time:"2024-10-18 15:59:00",open:234.97000,high:235.03000,low:234.91000,close:234.98000,volume:589727},{time:"2024-10-18 15:58:00",open:235.12000,high:235.12990,low:234.94000,close:234.96001,volume:277214},{time:"2024-10-18 15:57:00",open:235.10001,high:235.14500,low:235.04500,close:235.12000,volume:166419},{time:"2024-10-18 15:56:00",open:235.08000,high:235.14999,low:235.06000,close:235.09500,volume:113671},{time:"2024-10-18 15:55:00",open:235.05000,high:235.19000,low:234.92999,close:235.06250,volume:240698},{time:"2024-10-18 15:54:00",open:234.89000,high:235.09000,low:234.87000,close:235.05499,volume:223384},{time:"2024-10-18 15:53:00",open:234.94971,high:234.96001,low:234.83150,close:234.88499,volume:79013},{time:"2024-10-18 15:52:00",open:234.87000,high:234.94501,low:234.80000,close:234.94501,volume:114604},{time:"2024-10-18 15:51:00",open:234.94501,high:234.95500,low:234.86501,close:234.87500,volume:99216},{time:"2024-10-18 15:50:00",open:234.94000,high:234.98000,low:234.85001,close:234.94501,volume:98181},{time:"2024-10-18 15:49:00",open:234.99001,high:235.00999,low:234.95000,close:234.95000,volume:83322},{time:"2024-10-18 15:48:00",open:235.03500,high:235.05881,low:234.98000,close:234.98000,volume:59871},{time:"2024-10-18 15:47:00",open:235.00500,high:235.04500,low:235.00000,close:235.03500,volume:94747},{time:"2024-10-18 15:46:00",open:234.92000,high:235.02000,low:234.90500,close:234.91000,volume:26854},{time:"2024-10-18 15:45:00",open:235.02000,high:235.04000,low:234.90500,close:234.92500,volume:50751},{time:"2024-10-18 15:44:00",open:235.02000,high:235.05499,low:235.00000,close:235.02010,volume:48995},{time:"2024-10-18 15:43:00",open:234.98500,high:235.03000,low:234.98000,close:235.02010,volume:57465},{time:"2024-10-18 15:42:00",open:234.94380,high:234.99500,low:234.87010,close:234.98500,volume:59361},{time:"2024-10-18 15:41:00",open:235.06500,high:235.06500,low:234.92500,close:234.95000,volume:81442},{time:"2024-10-18 15:40:00",open:235.06110,high:235.07000,low:235.01990,close:235.06990,volume:56546},{time:"2024-10-18 15:39:00",open:235.13000,high:235.17101,low:235.00999,close:235.07001,volume:114311},{time:"2024-10-18 15:38:00",open:235.21001,high:235.25000,low:235.13500,close:235.13600,volume:53701},{time:"2024-10-18 15:37:00",open:235.13000,high:235.22000,low:235.13000,close:235.21001,volume:48911},{time:"2024-10-18 15:36:00",open:235.12000,high:235.12500,low:235.06000,close:235.12140,volume:33061},{time:"2024-10-18 15:35:00",open:235.14000,high:235.14999,low:235.08000,close:235.11000,volume:40707},{time:"2024-10-18 15:34:00",open:235.11000,high:235.14999,low:235.09000,close:235.14999,volume:29651},{time:"2024-10-18 15:33:00",open:235.07001,high:235.20000,low:235.07000,close:235.11340,volume:61136},{time:"2024-10-18 15:32:00",open:235.24500,high:235.27000,low:235.02000,close:235.03000,volume:142810},{time:"2024-10-18 15:31:00",open:235.25000,high:235.29000,low:235.24001,close:235.24500,volume:46359},{time:"2024-10-18 15:30:00",open:235.28999,high:235.30500,low:235.24001,close:235.25000,volume:41483}];

export function CandleChart() {
    const ascendingTime = [...initialData].reverse();
    return <div className={"w-full h-full"}>
        <CandleChartComponent data={ascendingTime} showMA={true}/>
    </div>;
}