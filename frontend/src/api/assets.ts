import Assets from "../types/Asset";
import { api } from "./api";

export const assetsApi = api.injectEndpoints({
  endpoints: (build) => ({
    assetsList: build.query<Assets.Set, void>({
      query: () => ({
        url: "/assets/list",
        method: "GET",
      }),
    }),
  }),
});

export const { useAssetsListQuery } = assetsApi;
