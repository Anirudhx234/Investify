import type { clientTypes, apiTypes } from "../types";
import api from "./api";

export const verifyApi = api.injectEndpoints({
  endpoints: (build) => ({
    verifyClient: build.query<clientTypes.Client, apiTypes.VerifyClientArgs>({
      query: ({ url, method, search, body }) => ({
        url,
        method,
        search,
        body,
      }),
      providesTags: ["logged-in-client"],
    }),
  }),
});

export const { useVerifyClientQuery } = verifyApi;
