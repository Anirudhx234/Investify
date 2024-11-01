import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Define the type for each data point
interface RiskPoint {
    name: string;
    risk: number; // X-axis (risk level)
    return: number; // Y-axis (return level)
}

// Define the component props
interface RiskToReturnPlotProps {
    data: RiskPoint[];
}

// Function to assign colors based on type
const getColorByType = (type: string) => {
    switch(type) {
        case 'stock': return '#015701'; // Green for stocks
        case 'crypto': return '#a1860a'; // Gold for crypto
        case 'etf': return '#800080'; // Purple for ETFs
        case 'mutual fund': return '#0204e7'; // Purple for ETFs
        default: return '#8884d8'; // Default color
    }
};

// Tooltip formatting function for custom display
const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const { name, risk, return: returnValue } = payload[0].payload;
        return (
            <div className="bg-white p-2 shadow-md rounded">
                <p><strong>{name}</strong></p>
                <p>Risk: {risk}%</p>
                <p>Return: {returnValue}%</p>
            </div>
        );
    }
    return null;
};

const RiskToReturnPlot = ({ data }: RiskToReturnPlotProps) => {
    return (
        <div>
            <h1>Risk To Return Plot (risk proportional to portfolio holdings)</h1>
            <ResponsiveContainer width="100%" height={400}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid />
                    <XAxis
                        type="number"
                        dataKey="risk"
                        name="Risk"
                        unit="%"
                        label={{ value: 'Risk (%)', position: 'insideBottomRight', offset: -10 }}
                    />
                    <YAxis
                        type="number"
                        dataKey="return"
                        name="Return"
                        unit="%"
                        label={{ value: 'Return (%)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    {data.map((entry, index) => (
                        <Scatter
                            key={`scatter-${index}`}
                            data={[entry]}
                            fill={getColorByType(entry.name)}
                        />
                    ))}
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RiskToReturnPlot;