import Clients from "../types/Clients";
import Portfolio from "../types/Portfolio";
import api from "./api";

export const portfolioApi = api.injectEndpoints({
  endpoints: (build) => ({
    portfolioAssets: build.query<
      Portfolio.PortfolioAssetsResponse,
      Clients.IdRequest
    >({
      query: ({ id = "me" }) => ({
        url: `/portfolios/${id}`,
        method: "GET",
      }),
      providesTags: (res, _err, args) =>
        res ? [{ type: "portfolios", id: args.id ?? "me" }] : [],
    }),

    addPortfolioAsset: build.mutation<
      void,
      Portfolio.AddPortfolioAssetRequest & Clients.IdRequest
    >({
      query: ({ id = "me", ...remainingArgs }) => ({
        url: `/portfolios/${id}/assets`,
        method: "POST",
        body: remainingArgs,
      }),
      invalidatesTags: (res, _err, args) =>
        res ? [{ type: "portfolios", id: args.id ?? "me" }] : [],
    }),

    modifyPortfolioAsset: build.mutation<
      void,
      Portfolio.ModifyPortfolioRequest
    >({
      query: ({ clientId = "me", assetId, ...remainingArgs }) => ({
        url: `/portfolios/${clientId}/assets/${assetId}`,
        method: "PATCH",
        body: remainingArgs,
      }),
      invalidatesTags: (res, _err, args) =>
        res ? [{ type: "portfolios", id: args.clientId ?? "me" }] : [],
    }),

    deletePortfolioAsset: build.mutation<
      void,
      Portfolio.DeletePortfolioRequest
    >({
      query: ({ clientId = "me", assetId }) => ({
        url: `/portfolios/${clientId}/assets/${assetId}`,
        method: "DElETE",
      }),
      invalidatesTags: (res, _err, args) =>
        res ? [{ type: "portfolios", id: args.clientId ?? "me" }] : [],
    }),
  }),
});

export const {
  useAddPortfolioAssetMutation,
  useDeletePortfolioAssetMutation,
  useModifyPortfolioAssetMutation,
  usePortfolioAssetsQuery,
} = portfolioApi;
