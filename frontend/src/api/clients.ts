import type { clientTypes } from "../types";

import { api } from "./api";

const clientsApi = api.injectEndpoints({
  endpoints: (build) => ({
    clientProfile: build.query<clientTypes.Client, { id: string }>({
      query: ({ id }) => ({
        url: "/clients/" + id,
        method: "GET",
      }),
      providesTags: (res, _err, args) => {
        if (args.id === "me") {
          return ["logged-in-client"];
        } else if (res) {
          return [{ type: "clients", id: res.id }];
        } else {
          return [];
        }
      },
    }),

    loggedInClientProfile: build.query<clientTypes.LoggedInClient, void>({
      query: () => ({
        url: "/clients/me",
        method: "GET",
      }),
      providesTags: ["logged-in-client"],
    }),

    fetchClients: build.query<clientTypes.Client[], void>({
      query: () => ({
        url: `/clients/fetchAll`,
        method: "GET",
      }),
    }),
    // Add a friend (POST request)
    addFriend: build.query<clientTypes.Client, { clientId: string, friendId: string }>({
      query: () => ({
        url: `/clients/addFriend`,
        method: 'POST',
      }),
    }),

    // // Remove a friend (DELETE request)
    // removeFriend: build.query<clientTypes.Client, { clientId: string, friendId: string }>({
    //   query: () => ({
    //     url: `/clients/removeFriend`,
    //     method: 'DELETE',
    //   }),
    // }),
    removeFriend: build.mutation<clientTypes.Client, { clientId: string; friendId: string }>({
      query: ({ clientId, friendId }) => ({
        url: "/removeFriend",
        method: "DELETE",
        body: { clientId, friendId },
      }),
      // invalidatesTags: (res) =>
      //     res ? [{ type: "clients", id: res.id }] : [],
    }),
    modifyEmail: build.mutation<
      clientTypes.LoggedInClient,
      { newEmail: string }
    >({
      query: ({ newEmail }) => ({
        url: "/clients/me/email",
        method: "PATCH",
        body: { newEmail },
      }),
    }),

    modifyProfile: build.mutation<clientTypes.LoggedInClient, FormData>({
      query: (formData) => ({
        url: "/clients/me",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["logged-in-client"],
    }),

    deleteClient: build.mutation<clientTypes.LoggedInClient, void>({
      query: () => ({
        url: "/clients/me",
        method: "DELETE",
      }),
      invalidatesTags: ["logged-in-client"],
    }),
  }),
});

export const {
  useClientProfileQuery,
  useLoggedInClientProfileQuery,
  useFetchClientsQuery,
  useAddFriendQuery,
  useRemoveFriendMutation,
  useModifyEmailMutation,
  useModifyProfileMutation,
  useDeleteClientMutation,
} = clientsApi;
