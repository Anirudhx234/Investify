import type { SignUpRequest, SignUpResponse } from "../types/Auth";
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
  }),
});

export const { useSignupMutation } = authApi;
