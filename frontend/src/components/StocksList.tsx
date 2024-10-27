import AssetLists from "../types/AssetLists";
import Stock = AssetLists.Stock;
import formatVolume from "../util/volumeFormatter.ts";

interface StocksListProps {
    stocks: Stock[];
}

export function isPositiveVal(percentChange: string): boolean {
    const numericValue = parseFloat(percentChange.replace('%', ''));
    return numericValue > 0;
}

export const StocksList = ({stocks}: StocksListProps) => {
    return (
        <div className="join w-full h-full flex flex-col gap-4">
            {stocks.map((stock) => (
                <div key={stock.ticker} className="join-item card shadow-lg bg-base-100 p-4 flex flex-row items-center gap-4">
                    <h1 className="text-lg font-bold flex-1">{stock.ticker}</h1>

                    <div className="text-center flex-1">
                        <p className="text-sm font-semibold text-gray-500">Volume</p>
                        <p className="text-base">{formatVolume(stock.volume)}</p>
                    </div>

                    <div className="text-right flex-1">
                        <p className="text-base font-semibold">${stock.price}</p>
                        <p
                            className={`text-sm ${
                                isPositiveVal(stock.change_percentage) ? 'text-green-500' : 'text-red-500'
                            }`}
                        >
                            {stock.change_percentage}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}