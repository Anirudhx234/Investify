import useTheme from "./hooks/useTheme";

import useSymbolData from "./hooks/useSymbolData";
import './styles/symboldata.css';

export default function App() {
    const symbol = "AAPL"; // Dynamically set this for different symbols
    const { data, loading, error } = useSymbolData(symbol);

    if (loading) return <div className="loader">Loading...</div>;
    if (error) return <div className="error">Error loading data</div>;

    return (
        <div className="app">
            <header>
                <h1>Symbol Data for {symbol}</h1>
            </header>
            <section className="symbol-container">
                <div className="symbol-card">
                    <h2>{data.name} ({data.symbol})</h2>
                    <p>Price: ${data.price}</p>
                    <p>Volume: {data.volume}</p>
                    <p>High: ${data.high}</p>
                    <p>Low: ${data.low}</p>
                    <p>Open: ${data.open}</p>
                    <p>Previous Close: ${data.previous_close}</p>
                    <p>Date: {new Date(data.date).toLocaleDateString()}</p>
                </div>
            </section>
        </div>
    );
}