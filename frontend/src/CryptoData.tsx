import useTheme from "./hooks/useTheme";

import useCryptoData from "./hooks/useCryptoData";
import './styles/cryptodata.css';

export default function App() {
    const symbol = "bitcoin";
    const { data, loading, error } = useCryptoData(symbol);

    if (loading) return <div className="loader">Loading...</div>;
    if (error) return <div className="error">Error loading data</div>;

    return (
        <div className="app">
            <header>
                <h1>Cryptocurrency Data for {symbol.charAt(0).toUpperCase() + symbol.slice(1)}</h1>
            </header>
            <section className="crypto-container">
                <div className="crypto-card">
                    <h2>{data.name} ({data.symbol.toUpperCase()})</h2>
                    <p>Price: ${data.current_price}</p>
                    <p>Market Cap: ${data.market_cap.toLocaleString()}</p>
                    <p>24h Volume: ${data.total_volume.toLocaleString()}</p>
                    <p>24h Change: {data.price_change_percentage_24h}%</p>
                    <p>High 24h: ${data.high_24h}</p>
                    <p>Low 24h: ${data.low_24h}</p>
                    <p>Date: {new Date(data.last_updated).toLocaleDateString()}</p>
                </div>
            </section>
        </div>
    );
}
