import {
  usePopularCryptoQuery,
  usePopularEtfsQuery,
  usePopularMutualFundsQuery,
  usePopularStocksQuery,
} from "../api/assets";
import { useRequest } from "../hooks/useRequests";
import { AssetSearchBar } from "../scenes/AssetSearchBar";
import {
  CryptoList,
  EtfList,
  MutualFundsList,
  StocksList,
} from "../scenes/MarketMoverList";

export function HomePage() {
  return (
    <div className="mt-12 flex w-full flex-col items-center gap-12">
      <AssetSearchBar />
      <MarketMovers />
    </div>
  );
}

export function MarketMovers() {
  const popularStocksState = usePopularStocksQuery();
  useRequest({
    requestLabel: "Popular Stocks",
    requestState: popularStocksState,
    successMessage: "Retrieved popular stocks!",
  });

  const popularMutualFundsState = usePopularMutualFundsQuery();
  useRequest({
    requestLabel: "Popular Mutual Funds",
    requestState: popularMutualFundsState,
    successMessage: "Retrieved popular mutual funds!",
  });

  const popularEtfsState = usePopularEtfsQuery();
  useRequest({
    requestLabel: "Popular Etfs",
    requestState: popularEtfsState,
    successMessage: "Retrieved popular etfs!",
  });

  const popularCryptoState = usePopularCryptoQuery();
  useRequest({
    requestLabel: "Popular Crypto",
    requestState: popularCryptoState,
    successMessage: "Retrieved popular crypto!",
  });

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
