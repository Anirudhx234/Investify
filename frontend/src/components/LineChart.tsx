interface ChartComponentProps {
    data: { time: string, value: number }[];
}

import { createChart } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

export const ChartComponent = ({ data }: ChartComponentProps) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<ReturnType<typeof createChart> | null>(null);  // Update type to remove 'any'

    useEffect(() => {
        if (chartContainerRef.current == null) return;

        const chartContainer = chartContainerRef.current;
        const chart = createChart(chartContainer, {
            width: chartContainer.clientWidth || 300,
            height: chartContainer.clientHeight || 400,  // Fallback height if no parent height
        });
        chartRef.current = chart;
        chart.timeScale().fitContent();

        const newSeries = chart.addAreaSeries({
            lineColor: '#2962FF',
            topColor: '#2962FF',
            bottomColor: 'rgba(41, 98, 255, 0.28)',
        });
        newSeries.setData(data);

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
    }, [data]);

    return <div ref={chartContainerRef} className={"w-full h-full"}/>;
};

const initialData = [
    { time: '2018-12-22', value: 32.51 },
    { time: '2018-12-23', value: 31.11 },
    { time: '2018-12-24', value: 27.02 },
    { time: '2018-12-25', value: 27.32 },
    { time: '2018-12-26', value: 25.17 },
    { time: '2018-12-27', value: 28.89 },
    { time: '2018-12-28', value: 25.46 },
    { time: '2018-12-29', value: 23.92 },
    { time: '2018-12-30', value: 22.68 },
    { time: '2018-12-31', value: 22.67 },
    { time: '2019-01-01', value: 32.51 },
    { time: '2019-01-02', value: 33.51 },
    { time: '2019-01-03', value: 34.51 },
    { time: '2019-01-04', value: 36.51 },
    { time: '2019-01-05', value: 37.51 },
    { time: '2019-01-06', value: 34.51 },
    { time: '2019-01-07', value: 30.51 },
    { time: '2019-01-08', value: 32.51 },
    { time: '2019-01-09', value: 32.51 },
    { time: '2019-01-10', value: 32.51 },
    { time: '2019-01-11', value: 31.51 },
    { time: '2019-01-12', value: 30.51 },
    { time: '2019-01-13', value: 29.51 },
    { time: '2019-01-14', value: 27.51 },
    { time: '2019-01-15', value: 25.51 },
    { time: '2019-01-16', value: 24.51 },
    { time: '2019-01-17', value: 23.51 },
    { time: '2019-01-18', value: 25.51 },
    { time: '2019-01-19', value: 27.51 },
    { time: '2019-01-20', value: 29.51 },
    { time: '2019-01-21', value: 33.51 },
    { time: '2019-01-22', value: 35.51 },
    { time: '2019-01-23', value: 39.51 },
    { time: '2019-01-24', value: 36.51 },
    { time: '2019-01-25', value: 39.51 },
    { time: '2019-01-26', value: 41.51 },
];

export function LineChart() {
    return <div className={"w-full h-full"}>
        <ChartComponent data={initialData} />
    </div>;
}