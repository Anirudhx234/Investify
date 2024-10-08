import type {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
} from "../types/Auth";
import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    signup: build.mutation<SignUpResponse, SignUpRequest>({
      query: ({ ...args }) => ({
        url: "/signup",
        method: "POST",
        body: args,
      }),
    }),
    login: build.mutation<LoginResponse, LoginRequest>({
      query: ({ ...args }) => ({
        url: "/login",
        method: "POST",
        body: args,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authApi;
