import { VerifyArgs } from "../types/Auth";
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
    }),
    modifyEmail: build.mutation<void, { email: string }>({
      query: ({ ...args }) => ({
        url: "/clients/modify-email",
        method: "PATCH",
        body: args,
      }),
      invalidatesTags: ["Profile"],
    }),
    verifyNewEmail: build.mutation<void, VerifyArgs>({
      query: ({ ...args }) => ({
        url: "/clients/verify-email?" + args.searchParams,
        method: "PATCH",
      }),
      invalidatesTags: ["Profile"],
    }),
    modifyProfile: build.mutation<void, FormData>({
      query: (formData) => ({
        url: "/clients/modify-profile",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useProfileDataQuery,
  useModifyEmailMutation,
  useVerifyNewEmailMutation,
  useModifyProfileMutation,
} = profileApi;
