import { clientTypes } from "../types";
import { api } from "./api";

export const socialApi = api.injectEndpoints({
  endpoints: (build) => ({
    getClients: build.query<clientTypes.BasicClient[], void>({
      query: () => ({
        url: "/clients",
        method: "GET",
      }),
    }),

    createFriendRequest: build.mutation<void, { friendId: string }>({
      query: (body) => ({
        url: "/clients/me/create-friend-request",
        method: "POST",
        body,
      }),
      invalidatesTags: ["logged-in-client"],
    }),

    acceptFriendRequest: build.mutation<void, { friendId: string }>({
      query: (body) => ({
        url: "/clients/me/accept-friend-request",
        method: "POST",
        body,
      }),
      invalidatesTags: ["logged-in-client"],
    }),

    declineFriendRequest: build.mutation<void, { friendId: string }>({
      query: (body) => ({
        url: "/clients/me/decline-friend-request",
        method: "POST",
        body,
      }),
      invalidatesTags: ["logged-in-client"],
    }),

    removeFriendRequest: build.mutation<void, { friendId: string }>({
      query: (body) => ({
        url: "/clients/me/remove-friend",
        method: "POST",
        body,
      }),
      invalidatesTags: ["logged-in-client"],
    }),
  }),
});

export const {
  useAcceptFriendRequestMutation,
  useCreateFriendRequestMutation,
  useDeclineFriendRequestMutation,
  useRemoveFriendRequestMutation,
  useGetClientsQuery,
  useLazyGetClientsQuery,
} = socialApi;
