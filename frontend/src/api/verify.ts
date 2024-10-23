import type Verify from "../types/Verify";
import api from "./api";

export const verifyApi = api.injectEndpoints({
  endpoints: (build) => ({
    verify: build.mutation<Verify.Response, Verify.Args>({
      query: ({ url, method, searchParams }) => ({
        url: url + "?" + (searchParams ?? ""),
        method,
      }),
    }),
  }),
});

export const { useVerifyMutation } = verifyApi;
