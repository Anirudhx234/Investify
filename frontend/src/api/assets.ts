import Asset from "../types/Asset";
import { api } from "./api";

export const assetsApi = api.injectEndpoints({
  endpoints: (build) => ({
    assetSet: build.query<Asset.Set, void>({
      query: () => ({
        url: "/asset/set",
        method: "GET",
      }),
    }),
  }),
});

export const { useAssetSetQuery } = assetsApi;
