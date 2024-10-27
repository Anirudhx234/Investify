import type Verify from "../types/Verify";
import api from "./api";

export const verifyApi = api.injectEndpoints({
  endpoints: (build) => ({
    verify: build.query<Verify.Response, Verify.Args>({
      query: ({ url, method, searchParams }) => ({
        url: url + "?" + (searchParams ?? ""),
        method,
      }),
      providesTags: (res) => [{ type: "clients", id: res?.id }],
    }),
  }),
});

export const { useVerifyQuery } = verifyApi;
