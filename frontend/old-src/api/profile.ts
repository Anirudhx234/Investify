import { ResetPasswordRequest, VerifyArgs } from "../types/Auth";
import { ProfileResponse } from "../types/Profile";
import { api } from "./api";

export const profileApi = api.injectEndpoints({
  endpoints: (build) => ({
    profileData: build.query<ProfileResponse, void>({
      query: () => ({
        url: "/clients/profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
      extraOptions: { base: false },
    }),
    modifyEmail: build.mutation<void, { newEmail: string }>({
      query: ({ ...args }) => ({
        url: "/clients/email",
        method: "PATCH",
        body: args,
      }),
      invalidatesTags: ["Profile"],
      extraOptions: { base: false },
    }),
    verifyNewEmail: build.mutation<void, VerifyArgs>({
      query: ({ ...args }) => ({
        url: "/clients/verify-email?" + args.searchParams,
        method: "PATCH",
      }),
      invalidatesTags: ["Profile"],
      extraOptions: { base: false },
    }),
    modifyProfile: build.mutation<void, FormData>({
      query: (formData) => ({
        url: "/clients/profile",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
      extraOptions: { base: false },
    }),
    deleteAccount: build.mutation<void, void>({
      query: () => ({
        url: "/clients",
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
      extraOptions: { base: false },
    }),
    resetPassword: build.mutation<void, VerifyArgs & ResetPasswordRequest>({
      query: ({ searchParams, ...args }) => ({
        url: "/clients/password?" + searchParams,
        method: "PATCH",
        body: {
          newPassword: args.password,
        },
      }),
      extraOptions: { base: false },
    }),
  }),
});

export const {
  useProfileDataQuery,
  useModifyEmailMutation,
  useVerifyNewEmailMutation,
  useModifyProfileMutation,
  useDeleteAccountMutation,
  useResetPasswordMutation,
} = profileApi;
