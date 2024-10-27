import type Assets from "../types/Assets";

import api from "./api";

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
    // assetChartData: build.query<>({}),
  }),
});

export const {
  useLazyAssetsSetQuery,
  useAssetsSetQuery,
  useAssetMetaDataQuery,
} = assetsApi;
