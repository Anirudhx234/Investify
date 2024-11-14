import type { apiTypes, clientTypes } from "../types";
import api from "./api";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<void, apiTypes.SignUpArgs>({
      query: ({ ...body }) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
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
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = authApi;
