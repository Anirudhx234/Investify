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
        if (res && args.id === "me") {
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
      invalidatesTags: [
        "logged-in-client",
        "client-portfolios",
        "portfolios",
        "sector-valuations",
        "risk-charts",
        "risk-assessments",
      ],
    }),
  }),
});

export const {
  useClientProfileQuery,
  useLoggedInClientProfileQuery,
  useModifyEmailMutation,
  useModifyProfileMutation,
  useDeleteClientMutation,
} = clientsApi;
