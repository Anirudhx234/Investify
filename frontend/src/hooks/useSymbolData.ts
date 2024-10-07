import { useState, useEffect } from "react";
import axios from "axios";

const useSymbolData = (symbol) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&apikey=YOUR_API_KEY`
                );
                const stockData = response.data.values[0];
                setData({
                    name: response.data.meta.symbol,
                    symbol: response.data.meta.symbol,
                    price: stockData.close,
                    volume: stockData.volume,
                    high: stockData.high,
                    low: stockData.low,
                    open: stockData.open,
                    previous_close: stockData.previous_close,
                    date: stockData.datetime,
                });
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [symbol]);

    return { data, loading, error };
};

export default useSymbolData;
