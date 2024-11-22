import type { apiTypes, portfolioTypes } from "../types";
import { convertUTCToLocalTime } from "../util/convertTimezone";
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
      invalidatesTags: (_res, _err, args) => [
        "client-portfolios",
        { type: "portfolios", id: args.id },
        { type: "sector-valuations", id: args.id },
        { type: "risk-charts", id: args.id },
        { type: "risk-assessments", id: args.id },
      ],
    }),

    getPortfolio: build.query<portfolioTypes.RealPortfolio, { id: string }>({
      query: ({ id }) => ({
        url: `/portfolios/${id}`,
        method: "GET",
      }),
      providesTags: (res, _err, args) =>
        res ? [{ type: "portfolios", id: args.id }] : [],
    }),

    getRealPortfolio: build.query<portfolioTypes.RealPortfolio, { id: string }>(
      {
        query: ({ id }) => ({
          url: `/portfolios/${id}`,
          method: "GET",
        }),
        providesTags: (res, _err, args) =>
          res ? [{ type: "portfolios", id: args.id }] : [],
      },
    ),

    getPaperPortfolio: build.query<
      portfolioTypes.PaperPortfolio,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/portfolios/${id}`,
        method: "GET",
      }),
      transformResponse: (res: portfolioTypes.PaperPortfolio) => {
        const trades = res.trades.map((trade) => ({
          ...trade,
          time: convertUTCToLocalTime(trade.time),
        }));

        return { ...res, trades };
      },
      providesTags: (res, _err, args) =>
        res ? [{ type: "portfolios", id: args.id }] : [],
    }),

    addRealPortfolioAsset: build.mutation<
      void,
      apiTypes.AddRealPortfolioAssetArgs
    >({
      query: ({ portfolioId, ...body }) => ({
        url: `/portfolios/${portfolioId}/assets`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_res, _err, args) => [
        { type: "portfolios", id: args.portfolioId },
        { type: "sector-valuations", id: args.portfolioId },
        { type: "risk-charts", id: args.portfolioId },
        { type: "risk-assessments", id: args.portfolioId },
      ],
    }),

    modifyRealPortfolioAsset: build.mutation<
      void,
      apiTypes.ModifyRealPortfolioAssetArgs
    >({
      query: ({ portfolioId, assetId, ...body }) => ({
        url: `/portfolios/${portfolioId}/assets/${assetId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_res, _err, args) => [
        { type: "portfolios", id: args.portfolioId },
        { type: "sector-valuations", id: args.portfolioId },
        { type: "risk-charts", id: args.portfolioId },
        { type: "risk-assessments", id: args.portfolioId },
      ],
    }),

    deleteRealPortfolioAsset: build.mutation<
      void,
      apiTypes.DeleteRealPortfolioAssetArgs
    >({
      query: ({ portfolioId, assetId }) => ({
        url: `/portfolios/${portfolioId}/assets/${assetId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, args) => [
        { type: "portfolios", id: args.portfolioId },
        { type: "sector-valuations", id: args.portfolioId },
        { type: "risk-charts", id: args.portfolioId },
        { type: "risk-assessments", id: args.portfolioId },
      ],
    }),

    sectorValuations: build.query<
      portfolioTypes.SectorValuations[],
      { portfolioId: string }
    >({
      query: ({ portfolioId }) => ({
        url: `/portfolios/${portfolioId}/sector-valuations`,
        method: "GET",
      }),
      providesTags: (res, _err, args) =>
        res ? [{ type: "sector-valuations", id: args.portfolioId }] : [],
    }),

    riskReturns: build.query<
      portfolioTypes.RiskPoint[],
      { portfolioId: string }
    >({
      query: ({ portfolioId }) => ({
        url: `/portfolios/${portfolioId}/risk-chart`,
        method: "GET",
      }),
      providesTags: (res, _err, args) =>
        res ? [{ type: "risk-charts", id: args.portfolioId }] : [],
    }),

    riskScore: build.query<portfolioTypes.RiskScore, { portfolioId: string }>({
      query: ({ portfolioId }) => ({
        url: `/portfolios/${portfolioId}/risk-assessment`,
        method: "GET",
      }),
      providesTags: (res, _err, args) =>
        res ? [{ type: "risk-assessments", id: args.portfolioId }] : [],
    }),

    addPaperPortfolioTrade: build.mutation<
      void,
      apiTypes.AddPaperPortfolioTradeArgs
    >({
      query: ({ portfolioId, ...body }) => ({
        url: `/portfolios/${portfolioId}/trades`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_res, _err, args) => [
        { type: "portfolios", id: args.portfolioId },
        { type: "sector-valuations", id: args.portfolioId },
        { type: "risk-charts", id: args.portfolioId },
        { type: "risk-assessments", id: args.portfolioId },
      ],
    }),
  }),
});

export const {
  useClientPortfoliosQuery,
  useCreatePortfolioMutation,
  useDeletePortfolioMutation,
  useGetRealPortfolioQuery,
  useGetPaperPortfolioQuery,
  useGetPortfolioQuery,
  useAddRealPortfolioAssetMutation,
  useModifyRealPortfolioAssetMutation,
  useDeleteRealPortfolioAssetMutation,
  useSectorValuationsQuery,
  useRiskReturnsQuery,
  useRiskScoreQuery,
  useAddPaperPortfolioTradeMutation,
} = portfolioApi;
