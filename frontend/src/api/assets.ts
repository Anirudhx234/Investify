import type { apiTypes, assetTypes } from "../types";
import { convertLabelToAssetType } from "../util/convertAsset";
import { convertIntervalToSecs } from "../util/convertIntervalToSecs";
import { convertToUnixTimestamp } from "../util/convertToUnixTimestamp";
import { api } from "./api";
import { host } from "./server";

export function timeSeriesResToEntries(res: apiTypes.TimeSeriesRes) {
  return res.values
    .map((entry) => ({
      datetime: entry.datetime,
      open: parseFloat(entry.open),
      close: parseFloat(entry.close),
      high: parseFloat(entry.high),
      low: parseFloat(entry.low),
      volume: parseFloat(entry.volume),
    }))
    .reverse();
}

export const assetsApi = api.injectEndpoints({
  endpoints: (build) => ({
    searchAssets: build.query<assetTypes.Set, { symbol: string }>({
      query: ({ symbol }) => ({
        url: "/assets",
        search: { symbol },
        method: "GET",
      }),
      transformResponse: (res: apiTypes.AssetSearchRes) => {
        const transformed: apiTypes.AssetSearchRes = {};
        Object.entries(res).forEach(([assetType, list]) => {
          transformed[convertLabelToAssetType(assetType)] = list;
        });

        return transformed as assetTypes.Set;
      },
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

    assetOneDayQuote: build.query<object, { symbol: string }>({
      query: ({ symbol }) => ({
        url: `/assets/quote/${symbol}`,
        search: { interval: "1day" },
        method: "GET",
      }),
    }),

    assetTimeSeries: build.query<
      assetTypes.TimeSeriesEntry[],
      apiTypes.TimeSeriesArgs
    >({
      query: ({ symbol, interval }) => ({
        url: `/assets/time-series/${symbol}`,
        search: { interval },
        method: "GET",
      }),
      transformResponse: timeSeriesResToEntries,
    }),

    assetPriceHistory: build.query<
      (assetTypes.TimeSeriesEntry | assetTypes.PriceHistoryEntry)[],
      apiTypes.TimeSeriesArgs
    >({
      query: ({ symbol, interval }) => ({
        url: `/assets/time-series/${symbol}`,
        search: { interval },
        method: "GET",
      }),
      transformResponse: timeSeriesResToEntries,
      onCacheEntryAdded: async (args, api) => {
        await api.cacheDataLoaded;
        const ws = new WebSocket(`ws://${host}/prices`);

        try {
          const listener = (e: MessageEvent) => {
            const data = JSON.parse(e.data);

            if (typeof data !== "object") return;
            if (typeof data["symbol"] !== "string") return;
            if (data["symbol"] !== args.symbol) return;
            if (typeof data["datetime"] !== "string") return;
            if (typeof data["price"] !== "number") return;

            api.updateCachedData((draft) => {
              const lastEnteredDataTime = convertToUnixTimestamp(
                draft[draft.length - 1].datetime,
              ) as number;

              const newTime = convertToUnixTimestamp(
                data["datetime"],
              ) as number;

              if (
                convertIntervalToSecs(args.interval) <=
                newTime - lastEnteredDataTime
              ) {
                draft.push(data);
              }
            });
          };

          ws.onopen = () => {
            ws.send(JSON.stringify({ symbol: args.symbol }));
          };

          ws.onmessage = listener;
        } catch {
          /* empty */
        }

        await api.cacheEntryRemoved;
        ws.close();
      },
    }),

    assetNews: build.query<string[][], { symbol: string }>({
      query: ({ symbol }) => ({
        url: `/assets/scraper/${symbol}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLazySearchAssetsQuery,
  usePopularStocksQuery,
  usePopularMutualFundsQuery,
  usePopularEtfsQuery,
  usePopularCryptoQuery,
  useAssetOneDayQuoteQuery,
  useAssetTimeSeriesQuery,
  useAssetPriceHistoryQuery,
  useAssetNewsQuery,
} = assetsApi;
