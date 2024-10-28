import {
  usePopularCryptoQuery,
  usePopularEtfsQuery,
  usePopularMutualFundsQuery,
  usePopularStocksQuery,
} from "../api/assets";
import {
  CryptoList,
  EtfList,
  MutualFundsList,
  StocksList,
} from "../components/MarketMoverList";

export default function MarketMovers() {
  const stocksData = usePopularStocksQuery();
  const mutualFundsData = usePopularMutualFundsQuery();
  const etfsData = usePopularEtfsQuery();
  const cryptoData = usePopularCryptoQuery();

  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      <StocksList
        title="Most Popular Stocks"
        stocks={stocksData.data?.most_actively_traded}
      />
      <StocksList
        title="Top Gainer Stocks"
        stocks={stocksData.data?.top_gainers}
      />
      <StocksList
        title="Top Loser Stocks"
        stocks={stocksData.data?.top_losers}
      />
      <MutualFundsList
        title="Popular Mutual Funds"
        mutualFunds={mutualFundsData.data}
      />
      <EtfList title="Popular ETFs" etfs={etfsData.data} />
      <CryptoList title="Popular Crypto" crypto={cryptoData.data} />
    </div>
  );
}
