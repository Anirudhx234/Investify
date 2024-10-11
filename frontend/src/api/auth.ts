import { type LoginRequest, type SignUpRequest, type VerifyArgs } from "../types/Auth";
import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    signup: build.mutation<void, SignUpRequest>({
      query: ({ ...args }) => ({
        url: "/auth/signup",
        method: "POST",
        body: args,
      }),
      extraOptions: { base: false },
    }),
    login: build.mutation<void, LoginRequest>({
      query: ({ ...args }) => ({
        url: "/auth/login",
        method: "POST",
        body: args,
      }),
      extraOptions: { base: false },
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Profile"],
      extraOptions: { base: false },
    }),
    verify: build.query<void, VerifyArgs>({
      query: ({ searchParams }) => ({
        url: "/auth/verify-email?" + searchParams,
        method: "GET",
      }),
      extraOptions: { base: false },
    }),
    forgotPassword: build.mutation<void, { email: string }>({
      query: ({ ...args }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: args,
      }),
      extraOptions: { base: false },
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useVerifyQuery,
  useForgotPasswordMutation
} = authApi;
