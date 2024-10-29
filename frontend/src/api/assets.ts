import type Assets from "../types/Assets";
import convertToUnixTimestamp from "../util/convertToUnixTimestamp";
import intervalSecs from "../util/intervalSecs";

import api from "./api";
import { createWebSocket } from "./websocket";

export const assetsApi = api.injectEndpoints({
  endpoints: (build) => ({
    assetsSet: build.query<Assets.SearchMenuItems, { symbol: string }>({
      query: ({ symbol }) => ({
        url: "/assets?symbol=" + symbol,
        method: "GET",
      }),
      transformResponse: (res: Assets.Set) => {
        const transformedData: Assets.SearchMenuItems = {};

        Object.entries(res).forEach(([type, list]) => {
          transformedData[type] = {
            items: list.map((item) => ({
              link: `/${type}/${item.symbol}`,
              label: `${item.name} (${item.symbol})`,
            })),
          };
        });

        return transformedData;
      },
    }),

    popularStocks: build.query<Assets.PopularStocksResponse, void>({
      query: () => ({
        url: "/assets/popular/stocks",
        method: "GET",
      }),
    }),

    popularMutualFunds: build.query<Assets.MutualFund[], void>({
      query: () => ({
        url: "/assets/popular/mutual-funds",
        method: "GET",
      }),
      transformResponse: (res: Assets.PopularMutualFundsResponse) =>
        res.result.list,
    }),

    popularEtfs: build.query<Assets.Etf[], void>({
      query: () => ({
        url: "/assets/popular/etfs",
        method: "GET",
      }),
      transformResponse: (res: Assets.PopularEtfsResponse) => res.result.list,
    }),

    popularCrypto: build.query<Assets.Crypto[], void>({
      query: () => ({
        url: "/assets/popular/crypto",
        method: "GET",
      }),
      transformResponse: (res: Assets.PopularCryptoResponse) => res.crypto,
    }),

    assetMetaData: build.query<object, Assets.AssetDataRequest>({
      query: ({ symbol }) => ({
        url: `/assets/quote/${symbol}?interval=1day`,
        method: "GET",
      }),
      providesTags: (_res, _err, args) => [
        { type: "asset-metadata", id: args.symbol },
      ],
    }),

    assetTimeSeriesData: build.query<
      Assets.TimeSeriesEntry[],
      Assets.TimeSeriesRequest
    >({
      query: ({ symbol, interval }) => ({
        url: `/assets/time-series/${symbol}?interval=${interval}`,
        method: "GET",
      }),
      transformResponse: (res: Assets.TimeSeriesResponse) => {
        const transformed: Assets.TimeSeriesEntry[] = [];
        for (let i = res.values.length - 1; i >= 0; i--) {
          const item = res.values[i];
          transformed.push({
            datetime: item.datetime,
            open: parseFloat(item.open),
            close: parseFloat(item.close),
            high: parseFloat(item.high),
            low: parseFloat(item.low),
            volume: parseFloat(item.volume),
          });
        }

        return transformed;
      },
    }),

    assetLivePriceData: build.query<
      (Assets.TimeSeriesEntry | Assets.PriceDataEntry)[],
      Assets.TimeSeriesRequest
    >({
      query: ({ symbol, interval }) => ({
        url: `/assets/time-series/${symbol}?interval=${interval}`,
        method: "GET",
      }),
      transformResponse: (res: Assets.TimeSeriesResponse) => {
        const transformed: Assets.TimeSeriesEntry[] = [];
        for (let i = res.values.length - 1; i >= 0; i--) {
          const item = res.values[i];
          transformed.push({
            datetime: item.datetime,
            open: parseFloat(item.open),
            close: parseFloat(item.close),
            high: parseFloat(item.high),
            low: parseFloat(item.low),
            volume: parseFloat(item.volume),
          });
        }

        return transformed;
      },
      onCacheEntryAdded: async (
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData },
      ) => {
        await cacheDataLoaded;

        const ws = createWebSocket({
          url: `/prices`,
        });

        try {
          const listener = (e: MessageEvent) => {
            const data = JSON.parse(e.data);

            if (typeof data !== "object") return;
            if (typeof data["symbol"] !== "string") return;
            if (data["symbol"] !== arg.symbol) return;
            if (typeof data["datetime"] !== "string") return;
            if (typeof data["price"] !== "number") return;

            updateCachedData((draft) => {
              const lastEnteredDataTime = convertToUnixTimestamp(
                draft[draft.length - 1].datetime,
              ) as number;

              const newTime = convertToUnixTimestamp(
                data["datetime"],
              ) as number;

              if (intervalSecs(arg.interval) <= newTime - lastEnteredDataTime) {
                draft.push(data);
              }
            });
          };

          ws.onopen = () => {
            ws.send(JSON.stringify({ symbol: arg.symbol }));
          };

          ws.onmessage = listener;
        } catch {
          /* empty */
        }

        await cacheEntryRemoved;
        ws.close();
      },
    }),
  }),
});

export const {
  useLazyAssetsSetQuery,
  useAssetsSetQuery,
  useAssetMetaDataQuery,
  useAssetTimeSeriesDataQuery,
  useAssetLivePriceDataQuery,
  usePopularStocksQuery,
  usePopularMutualFundsQuery,
  usePopularEtfsQuery,
  usePopularCryptoQuery,
} = assetsApi;
