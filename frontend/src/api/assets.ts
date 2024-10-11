import Asset from "../types/Asset";
import { api } from "./api";

export const assetsApi = api.injectEndpoints({
  endpoints: (build) => ({
    assetSet: build.query<Asset.Set, void>({
      query: () => ({
        url: "/assets/set",
        method: "GET",
      }),
      extraOptions: { base: false },
    }),
    popularStocks: build.query<
      {
        top_gainers: Asset.Stock[];
        top_losers: Asset.Stock[];
        most_actively_traded: Asset.Stock[];
      },
      void
    >({
      query: () => ({
        url: "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=G",
        method: "GET",
      }),
      extraOptions: { base: true },
    }),
    popularMutualFunds: build.query<
      { result: { list: Asset.MutualFund[] } },
      void
    >({
      query: () => ({
        url: "https://api.twelvedata.com/mutual_funds/list?outputsize=50&apikey=439328def79441b9b6c17cf807f26b09",
        method: "GET",
      }),
      extraOptions: { base: true },
    }),
    popularETFS: build.query<
      { result: { list: Asset.ETF[] } },
      void
    >({
      query: () => ({
        url: "https://api.twelvedata.com/etfs/list?outputsize=50&apikey=439328def79441b9b6c17cf807f26b09",
        method: "GET",
      }),
      extraOptions: { base: true },
    }),
    popularCrypto: build.query<{ data: Asset.Crypto[] }, void>({
      query: () => ({
        url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=50&convert=USD&CMC_PRO_API_KEY=7a218076-f8f4-4a16-8516-302984384db9",
        method: "GET"
      }),
      extraOptions: { base: true },
    }),
  }),
});

export const {
  useAssetSetQuery,
  usePopularStocksQuery,
  usePopularMutualFundsQuery,
  usePopularETFSQuery,
  usePopularCryptoQuery
} = assetsApi;
