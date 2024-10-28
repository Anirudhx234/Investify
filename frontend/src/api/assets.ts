import type Assets from "../types/Assets";

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
    assetMetaData: build.query<object, Assets.MetaDataRequest>({
      query: ({ type, symbol }) => ({
        url: `/assets/${type}/${symbol}/quote`,
        method: "GET",
      }),
      providesTags: (_res, _err, args) => [
        { type: "asset-metadata", id: `/${args.type}/${args.symbol}` },
      ],
    }),
    assetChartData: build.query<Assets.ChartData, Assets.ChartDataRequest>({
      query: ({ type, symbol, interval }) => ({
        url: `/assets/${type}/${symbol}/chart?interval=${interval}`,
        method: "GET",
      }),
      onCacheEntryAdded: async (
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData },
      ) => {
        await cacheDataLoaded;

        const ws = createWebSocket({
          url: `/assets/${arg.type}/${arg.symbol}/subscribe?interval=${arg.interval}`,
        });

        try {
          const listener = (e: MessageEvent) => {
            const data = JSON.parse(e.data);

            if (typeof data !== "object") return;
            if (typeof data["datetime"] !== "string") return;
            if (typeof data["open"] !== "number") return;
            if (typeof data["high"] !== "number") return;
            if (typeof data["low"] !== "number") return;
            if (typeof data["close"] !== "number") return;
            if (typeof data["volume"] !== "number") return;

            updateCachedData((draft) => {
              draft.values.push(data);
            });
          };

          ws.addEventListener("message", listener);
        } catch {
          /* empty */
        }

        await cacheEntryRemoved;
      },
    }),
  }),
});

export const {
  useLazyAssetsSetQuery,
  useAssetsSetQuery,
  useAssetMetaDataQuery,
  useAssetChartDataQuery
} = assetsApi;
