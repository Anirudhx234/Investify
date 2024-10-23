import type AppClient from "../types/AppClient";

import api from "./api";

const clientsApi = api.injectEndpoints({
  endpoints: (build) => ({
    clientProfile: build.query<AppClient, { id: string }>({
      query: ({ id }) => ({
        url: "/clients/" + id,
        method: "GET",
      }),
      providesTags: (_res, _err, args) => [{ type: "clients", id: args.id }],
    }),
    modifyEmail: build.mutation<void, { id: string; newEmail: string }>({
      query: ({ id, newEmail }) => ({
        url: "/clients/" + id + "/email",
        method: "PATCH",
        body: { newEmail },
      }),
      invalidatesTags: (_res, _err, args) => [{ type: "clients", id: args.id }],
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
      invalidatesTags: (_res, _err, args) => [{ type: "clients", id: args.id }],
    }),
    deleteClient: build.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: "/clients/" + id,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, args) => [{ type: "clients", id: args.id }],
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
