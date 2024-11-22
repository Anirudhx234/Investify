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
    addFriend: build.mutation<clientTypes.Client, { clientId: string; friendId: string }>({
      query: ({ clientId, friendId }) => ({
        url: `/clients/${clientId}/add-friend/${friendId}`,
        method: 'POST',
      }),
    }),
    removeFriend: build.mutation<clientTypes.Client, { clientId: string; friendId: string }>({
      query: ({ clientId, friendId }) => ({
        url: `/clients/${clientId}/remove-friend/${friendId}`,
        method: 'DELETE',
      }),
    }),
    addFriendRequest: build.mutation<clientTypes.Client, { clientId: string; friendId: string }>({
      query: ({ clientId, friendId }) => ({
        url: `/clients/${clientId}/add-friend-request/${friendId}`,
        method: 'POST',
      }),
    }),
    removeFriendRequest: build.mutation<clientTypes.Client, { clientId: string; friendId: string }>({
      query: ({ clientId, friendId }) => ({
        url: `/clients/${clientId}/remove-friend-request/${friendId}`,
        method: 'DELETE',
      }),
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
  useAddFriendMutation,
  useRemoveFriendMutation,
  useAddFriendRequestMutation,
  useRemoveFriendRequestMutation,
  useModifyEmailMutation,
  useModifyProfileMutation,
  useDeleteClientMutation,
} = clientsApi;
