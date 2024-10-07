import { useState, useEffect } from "react";
import axios from "axios";

const useNews = (symbol) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`https://newsapi.org/v2/everything?q=${symbol}&apiKey=YOUR_API_KEY`);
                setNews(response.data.articles);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [symbol]);

    return { news, loading, error };
};

export default useNews;
