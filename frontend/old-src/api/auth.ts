import type Auth from "../types/Auth";
import api from "./api";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<Auth.SignUpResponse, Auth.SignUpRequest>({
      query: ({ ...args }) => ({
        url: "/auth/signup",
        method: "POST",
        body: args,
      }),
    }),
    login: build.mutation<Auth.LoginResponse, Auth.LoginRequest>({
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
    }),
    forgotPassword: build.mutation<void, { email: string }>({
      query: ({ ...args }) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: args,
      }),
    }),
    resetPassword: build.mutation<
      void,
      { searchParams?: string | undefined; newPassword: string }
    >({
      query: ({ newPassword, searchParams }) => ({
        url: "/auth/reset-password?" + (searchParams ?? ""),
        method: "PATCH",
        body: { newPassword },
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
