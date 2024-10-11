interface ChartComponentProps {
    data: { time: string, value: number }[];
}

import { createChart } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

export const ChartComponent = (data: ChartComponentProps) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chartContainerRef.current == null) return;
        const chartRef = chartContainerRef.current;
        //const clientWidth = chartContainerRef.current.clientWidth;

        const handleResize = () => {
            chart.applyOptions({ width: 500, height: 500});
        };

        // const chartOptions = {
        //     layout: {
        //         textColor: 'black',
        //         background: { type: 'solid', color: 'white' }
        //     },
        //     width: chartContainerRef.current.clientWidth,
        //     height: 300,
        // };
        const chart = createChart(chartRef);
        chart.timeScale().fitContent();

        const newSeries = chart.addAreaSeries({
            lineColor: '#2962FF',
            topColor: '#2962FF',
            bottomColor: 'rgba(41, 98, 255, 0.28)'
        });
        newSeries.setData(data.data);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [data]);

    return (
        <div ref={chartContainerRef} />
    );
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
];

export function LineChart() {
    return <ChartComponent data={initialData} />;
}


