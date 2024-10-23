import type Assets from "../types/Assets";

import api from "./api";

export const assetsApi = api.injectEndpoints({
  endpoints: (build) => ({
    assetsSet: build.query<Assets.Set, void>({
      query: () => ({
        url: "/assets",
        method: "GET",
      }),
      providesTags: ["assets-set"],
    }),
  }),
});

export const { useAssetsSetQuery } = assetsApi;
