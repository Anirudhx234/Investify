import type { LoginRequest, SignUpRequest, VerifyArgs } from "../types/Auth";
import buildUrl from "../utils/buildUrl";
import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    signup: build.mutation<void, SignUpRequest>({
      query: ({ ...args }) => ({
        url: "/signup",
        method: "POST",
        body: args,
      }),
    }),
    login: build.mutation<void, LoginRequest>({
      query: ({ ...args }) => ({
        url: "/login",
        method: "POST",
        body: args,
      }),
    }),
    signout: build.mutation<void, void>({
      query: () => ({
        url: "/signout",
        method: "POST",
      }),
    }),
    verify: build.query<void, VerifyArgs>({
      query: ({ ...args }) => ({
        url: buildUrl("/verify", args),
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useSignoutMutation,
  useVerifyQuery,
} = authApi;
