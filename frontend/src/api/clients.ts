import { clientTypes } from "../types";

import api from "./api";

const clientsApi = api.injectEndpoints({
  endpoints: (build) => ({
    clientProfile: build.query<clientTypes.Client, { id: string }>({
      query: ({ id }) => ({
        url: "/clients/" + id,
        method: "GET",
      }),
      providesTags: (res) => [{ type: "clients", id: res?.id }],
    }),

    loggedInClientProfile: build.query<clientTypes.LoggedInClient, void>({
      query: () => ({
        url: "/clients/me",
        method: "GET",
      }),
      providesTags: ["logged-in-client"],
    }),
  }),
});

export const { useClientProfileQuery, useLoggedInClientProfileQuery } =
  clientsApi;
