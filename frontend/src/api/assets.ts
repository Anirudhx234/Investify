import { apiTypes, assetTypes } from "../types";
import api from "./api";

export const assetsApi = api.injectEndpoints({
  endpoints: (build) => ({
    searchAssets: build.query<assetTypes.Set, { symbol: string }>({
      query: ({ symbol }) => ({
        url: "/assets",
        search: { symbol },
        method: "GET",
      }),
    }),

    popularStocks: build.query<apiTypes.PopularStocksRes, void>({
      query: () => ({
        url: "/assets/popular/stocks",
        method: "GET",
      }),
    }),

    popularMutualFunds: build.query<assetTypes.MutualFund[], void>({
      query: () => ({
        url: "/assets/popular/mutual-funds",
        method: "GET",
      }),
      transformResponse: (res: { result: { list: assetTypes.MutualFund[] } }) =>
        res.result.list,
    }),

    popularEtfs: build.query<assetTypes.Etf[], void>({
      query: () => ({
        url: "/assets/popular/etfs",
        method: "GET",
      }),
      transformResponse: (res: { result: { list: assetTypes.Etf[] } }) =>
        res.result.list,
    }),

    popularCrypto: build.query<assetTypes.Crypto[], void>({
      query: () => ({
        url: "/assets/popular/crypto",
        method: "GET",
      }),
      transformResponse: (res: { crypto: assetTypes.Crypto[] }) => res.crypto,
    }),
  }),
});

export const {
  useLazySearchAssetsQuery,
  usePopularStocksQuery,
  usePopularMutualFundsQuery,
  usePopularEtfsQuery,
  usePopularCryptoQuery,
} = assetsApi;
