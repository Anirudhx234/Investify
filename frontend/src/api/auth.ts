import type { LoginRequest, SignUpRequest, VerifyArgs } from "../types/Auth";
import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    signup: build.mutation<void, SignUpRequest>({
      query: ({ ...args }) => ({
        url: "/auth/signup",
        method: "POST",
        body: args,
      }),
    }),
    login: build.mutation<void, LoginRequest>({
      query: ({ ...args }) => ({
        url: "/auth/login",
        method: "POST",
        body: args,
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Profile"],
    }),
    verify: build.query<void, VerifyArgs>({
      query: ({ searchParams }) => ({
        url: "/auth/verify-email?" + searchParams,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useVerifyQuery,
} = authApi;
