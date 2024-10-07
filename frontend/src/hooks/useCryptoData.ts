import { useState, useEffect } from "react";
import axios from "axios";

const useCryptoData = (symbol) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
                    params: {
                        vs_currency: 'usd',
                        ids: symbol,
                    },
                });

                const cryptoData = response.data[0];
                setData({
                    name: cryptoData.name,
                    symbol: cryptoData.symbol,
                    current_price: cryptoData.current_price,
                    market_cap: cryptoData.market_cap,
                    total_volume: cryptoData.total_volume,
                    price_change_percentage_24h: cryptoData.price_change_percentage_24h,
                    high_24h: cryptoData.high_24h,
                    low_24h: cryptoData.low_24h,
                    last_updated: cryptoData.last_updated,
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

export default useCryptoData;
