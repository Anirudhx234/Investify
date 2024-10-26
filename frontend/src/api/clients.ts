import type AppClient from "../types/AppClient";
import type Clients from "../types/Clients";

import api from "./api";

const clientsApi = api.injectEndpoints({
  endpoints: (build) => ({
    clientProfile: build.query<AppClient, Clients.IdRequest>({
      query: ({ id = "me" }) => ({
        url: "/clients/" + id,
        method: "GET",
      }),
      providesTags: (res) => [{ type: "clients", id: res?.id }],
    }),
    modifyEmail: build.mutation<
      AppClient,
      Clients.IdRequest & { newEmail: string }
    >({
      query: ({ id = "me", newEmail }) => ({
        url: "/clients/" + id + "/email",
        method: "PATCH",
        body: { newEmail },
      }),
      invalidatesTags: (res) => [{ type: "clients", id: res?.id }],
    }),
    modifyPassword: build.mutation<
      AppClient,
      Clients.IdRequest & { newPassword: string }
    >({
      query: ({ id = "me", newPassword }) => ({
        url: "/clients/" + id + "/password",
        method: "PATCH",
        body: { newPassword },
      }),
    }),
    modifyProfile: build.mutation<
      AppClient,
      Clients.IdRequest & { formData: FormData }
    >({
      query: ({ id = "me", formData }) => ({
        url: "/clients/" + id,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (res) => [{ type: "clients", id: res?.id }],
    }),
    deleteClient: build.mutation<AppClient, Clients.IdRequest>({
      query: ({ id = "me" }) => ({
        url: "/clients/" + id,
        method: "DELETE",
      }),
      invalidatesTags: (res) => [{ type: "clients", id: res?.id }],
    }),
  }),
});

export const {
  useClientProfileQuery,
  useModifyEmailMutation,
  useModifyPasswordMutation,
  useModifyProfileMutation,
  useDeleteClientMutation,
} = clientsApi;
