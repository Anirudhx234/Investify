import {
    usePopularStocksQuery
} from "../api/assets";

const HeatMap = () => {
    const stocksData = usePopularStocksQuery();

    if (stocksData.isLoading) return <div>Loading...</div>;
    if (stocksData.isError) return <div>Error fetching data.</div>;

    const mostActivelyTraded = stocksData.data?.most_actively_traded || [];

    return (
        <div className="flex flex-wrap items-center justify-center gap-8">
            <h2 className="text-2xl font-bold mb-4">Heatmap of Most Actively Traded Stocks</h2>
            <div className="grid grid-cols-3 gap-4">
                {mostActivelyTraded.map((stock) => {
                    const changePercentage = parseFloat(stock.change_percentage);
                    let bgColor = "";

                    if (changePercentage > 0) {
                        bgColor = "bg-green-500"; // Positive change
                    } else if (changePercentage < 0) {
                        bgColor = "bg-red-500"; // Negative change
                    } else {
                        bgColor = "bg-gray-500"; // No change
                    }

                    return (
                        <div
                            key={stock.ticker}
                            className={`p-4 rounded-lg text-white ${bgColor} transition-transform transform hover:scale-105`}
                        >
                            <h3 className="font-semibold">{stock.ticker}</h3>
                            <p>Price: ${stock.price}</p>
                            <p>Change: {stock.change_amount} ({stock.change_percentage})</p>
                            <p>Volume: {stock.volume}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HeatMap;