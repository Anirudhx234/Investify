import { apiTypes } from "../types";

import { api } from "./api";

const portfolioApi = api.injectEndpoints({
  endpoints: (build) => ({
    clientPortfolios: build.query<apiTypes.ClientPortfoliosRes, void>({
      query: () => ({
        url: "portfolios/clients/me",
        method: "GET",
      }),
      providesTags: ["client-portfolios"],
    }),

    createPortfolio: build.mutation<void, apiTypes.CreatePortfolioArgs>({
      query: ({ name, buyingPower }) => ({
        url: `portfolios/clients/me/${buyingPower === undefined ? "real" : "paper"}`,
        method: "POST",
        body: { name, buyingPower },
      }),
      invalidatesTags: ["client-portfolios"],
    }),

    deletePortfolio: build.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `portfolios/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["client-portfolios"],
    }),
  }),
});

export const {
  useClientPortfoliosQuery,
  useCreatePortfolioMutation,
  useDeletePortfolioMutation,
} = portfolioApi;
