import type { apiTypes, portfolioTypes } from "../types";
import { api } from "./api";

const portfolioApi = api.injectEndpoints({
  endpoints: (build) => ({
    clientPortfolios: build.query<apiTypes.ClientPortfoliosRes, void>({
      query: () => ({
        url: "/portfolios/clients/me",
        method: "GET",
      }),
      providesTags: ["client-portfolios"],
    }),

    createPortfolio: build.mutation<void, apiTypes.CreatePortfolioArgs>({
      query: ({ name, buyingPower }) => ({
        url: `/portfolios/clients/me/${buyingPower === undefined ? "real" : "paper"}`,
        method: "POST",
        body: { name, buyingPower },
      }),
      invalidatesTags: ["client-portfolios"],
    }),

    deletePortfolio: build.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/portfolios/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["client-portfolios"],
    }),

    getPortfolio: build.query<portfolioTypes.Portfolio, { id: string }>({
      query: ({ id }) => ({
        url: `/portfolios/${id}`,
        method: "GET",
      }),
      providesTags: (_res, _err, args) => [{ type: "portfolio", id: args.id }],
    }),

    addRealPortfolioAsset: build.mutation<
      void,
      apiTypes.AddRealPortfolioAssetArgs
    >({
      query: ({ id, ...body }) => ({
        url: `/portfolios/${id}/assets`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_res, _err, args) => [
        { type: "portfolio", id: args.id },
      ],
    }),

    modifyRealPortfolioAsset: build.mutation<
      void,
      apiTypes.ModifyRealPortfolioAssetArgs
    >({
      query: ({ portfolioId, assetId, ...body }) => ({
        url: `/portfolio/${portfolioId}/assets/${assetId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_res, _err, args) => [
        { type: "portfolio", id: args.portfolioId },
      ],
    }),

    deleteRealPortfolioAsset: build.mutation<
      void,
      apiTypes.DeleteRealPortfolioAssetArgs
    >({
      query: ({ portfolioId, assetId }) => ({
        url: `/portfolio/${portfolioId}/assets/${assetId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, args) => [
        { type: "portfolio", id: args.portfolioId },
      ],
    }),
  }),
});

export const {
  useClientPortfoliosQuery,
  useCreatePortfolioMutation,
  useDeletePortfolioMutation,
  useGetPortfolioQuery,
  useAddRealPortfolioAssetMutation,
  useModifyRealPortfolioAssetMutation,
  useDeleteRealPortfolioAssetMutation,
} = portfolioApi;
