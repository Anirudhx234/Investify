import type Verify from "../types/Verify";
import buildUrl from "../util/buildUrl";
import api from "./api";

export const verifyApi = api.injectEndpoints({
  endpoints: (build) => ({
    verify: build.mutation<Verify.Response, Verify.Args>({
      query: ({ url, method, searchParams }) => ({
        url:
          typeof searchParams === "string"
            ? url + searchParams
            : buildUrl(url, searchParams),
        method,
      }),
    }),
  }),
});

export const { useVerifyMutation } = verifyApi;
