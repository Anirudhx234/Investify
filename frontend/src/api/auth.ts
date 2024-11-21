import type { apiTypes, clientTypes } from "../types";
import { api } from "./api";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<void, apiTypes.SignUpArgs>({
      query: ({ ...body }) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["logged-in-client"],
    }),

    verifyClient: build.query<void, apiTypes.VerifyClientArgs>({
      query: ({ url, search }) => ({
        url,
        method: "GET",
        search,
      }),
      providesTags: ["logged-in-client"],
    }),

    login: build.mutation<
      clientTypes.LoggedInClient,
      Pick<apiTypes.SignUpArgs, "email" | "password">
    >({
      query: ({ ...body }) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["logged-in-client"],
    }),

    logout: build.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: [
        "logged-in-client",
        "client-portfolios",
        "portfolios",
        "sector-valuations",
        "risk-charts",
        "risk-assessments",
      ],
    }),

    forgotPassword: build.mutation<void, Pick<apiTypes.SignUpArgs, "email">>({
      query: ({ ...args }) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: args,
      }),
      invalidatesTags: ["logged-in-client"],
    }),

    resetPassword: build.mutation<void, apiTypes.ResetPasswordArgs>({
      query: ({ search, password }) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        search,
        body: {
          newPassword: password,
        },
      }),
      invalidatesTags: ["logged-in-client"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useVerifyClientQuery,
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
