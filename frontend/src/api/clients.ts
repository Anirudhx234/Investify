import type AppClient from "../types/AppClient";

import api from "./api";

const clientsApi = api.injectEndpoints({
  endpoints: (build) => ({
    clientProfile: build.query<AppClient, { id: string }>({
      query: ({ id }) => ({
        url: "/clients/" + id,
        method: "GET",
      }),
    }),
    modifyEmail: build.mutation<void, { id: string; newEmail: string }>({
      query: ({ id, newEmail }) => ({
        url: "/clients/" + id + "/email",
        method: "PATCH",
        body: { newEmail },
      }),
    }),
    modifyPassword: build.mutation<void, { id: string; newPassword: string }>({
      query: ({ id, newPassword }) => ({
        url: "/clients/" + id + "/password",
        method: "PATCH",
        body: { newPassword },
      }),
    }),
    modifyProfile: build.mutation<void, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: "/clients/" + id,
        method: "PATCH",
        body: formData,
      }),
    }),
    deleteProfile: build.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: "/clients/" + id,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useClientProfileQuery,
  useModifyEmailMutation,
  useModifyPasswordMutation,
  useModifyProfileMutation,
  useDeleteProfileMutation,
} = clientsApi;
