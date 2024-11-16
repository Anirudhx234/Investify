import {
  usePopularCryptoQuery,
  usePopularEtfsQuery,
  usePopularMutualFundsQuery,
  usePopularStocksQuery,
} from "../api/assets";
import { useToastForRequests } from "../hooks/useToastForRequests";
import { AssetSearchBar } from "../scenes/AssetSearchBar";
import {
  CryptoList,
  EtfList,
  MutualFundsList,
  StocksList,
} from "../scenes/MarketMoverList";

export function HomePage() {
  return (
    <div className="mt-6 flex w-full flex-col items-center gap-12">
      <h1 className="text-3xl font-bold text-primary">Welcome to Investify!</h1>
      <AssetSearchBar />
      <MarketMovers />
    </div>
  );
}

export function MarketMovers() {
  const popularStocksState = usePopularStocksQuery();
  const popularMutualFundsState = usePopularMutualFundsQuery();
  const popularEtfsState = usePopularEtfsQuery();
  const popularCryptoState = usePopularCryptoQuery();

  useToastForRequests([
    { label: "Popular Stocks", state: popularStocksState },
    { label: "Popular Mutual Funds", state: popularMutualFundsState },
    { label: "Popular Etfs", state: popularEtfsState },
    { label: "Popular Crypto", state: popularCryptoState },
  ], { backupSuccessMessage: "Retrieved market movers!" });

  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      <StocksList
        title="Most Popular Stocks"
        stocks={popularStocksState.data?.most_actively_traded}
      />
      <StocksList
        title="Top Gainer Stocks"
        stocks={popularStocksState.data?.top_gainers}
      />
      <StocksList
        title="Top Loser Stocks"
        stocks={popularStocksState.data?.top_losers}
      />
      <MutualFundsList
        title="Popular Mutual Funds"
        mutualFunds={popularMutualFundsState.data}
      />
      <EtfList title="Popular ETFs" etfs={popularEtfsState.data} />
      <CryptoList title="Popular Crypto" crypto={popularCryptoState.data} />
    </div>
  );
}
