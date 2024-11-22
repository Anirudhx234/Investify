import { apiTypes, gameTypes } from "../types";
import { api } from "./api";

const gameApi = api.injectEndpoints({
  endpoints: (build) => ({
    createGame: build.mutation<gameTypes.Game, Omit<gameTypes.Game, "id">>({
      query: ({ ...body }) => ({
        url: "/games/clients/me",
        method: "POST",
        body,
      }),
      invalidatesTags: ["client-game-portfolios-list"],
    }),

    getGamePortfolio: build.query<gameTypes.GamePortfolio, { gameId: string }>({
      query: ({ gameId }) => ({
        url: `/games/${gameId}/clients/me`,
        method: "GET",
      }),
      providesTags: (res) =>
        res ? [{ type: "client-game-portfolios", id: res.game.id }] : [],
    }),

    gamePortfolios: build.query<apiTypes.GamePortfoliosRes, void>({
      query: () => ({
        url: "/games/clients/me",
        method: "GET",
      }),
      providesTags: ["client-game-portfolios-list"],
    }),

    availableGames: build.query<apiTypes.AvailableGamesRes, void>({
      query: () => ({
        url: "/games/clients/me/available-games",
        method: "GET",
      }),
      providesTags: ["client-available-games-list"],
    }),

    joinGame: build.mutation<gameTypes.GamePortfolio, { gameId: string }>({
      query: ({ gameId }) => ({
        url: `/games/${gameId}/clients/me/join`,
        method: "POST",
      }),
      invalidatesTags: (_res, _err, args) => [
        "client-available-games-list",
        "client-game-portfolios-list",
        { type: "game-leaderboards", id: args.gameId },
      ],
    }),

    leaderboardData: build.query<gameTypes.Player[], { gameId: string }>({
      query: ({ gameId }) => ({
        url: `/games/${gameId}/leaderboard`,
        method: "GET",
      }),
      providesTags: (res, _err, args) =>
        res ? [{ type: "game-leaderboards", id: args.gameId }] : [],
    }),
    
    getGames: build.query<gameTypes.GamePortfolioResponse, void>({
        query: () => ({
            url: `/games/clients/me`,
            method: "GET",
        }),
        providesTags: ["games"],
    }),
    
    deleteGame: build.mutation<void, { id: string }>({
        query: ({ id }) => ({
            url: `/games/${id}`,
            method: "DELETE",
        }),
        invalidatesTags: (_res, _err, args) => [{ type: "games", id: args.id }],
    }),

    getGameById: build.query<gameTypes.Game, { id: string }>({
        query: ({ id }) => ({
            url: `/games/${id}`,
            method: "GET",
        }),
        providesTags: (_res, _err, args) => [{ type: "games", id: args.id }],
    }),
  }),
});

export const {
  useAvailableGamesQuery,
  useCreateGameMutation,
  useGamePortfoliosQuery,
  useJoinGameMutation,
  useLeaderboardDataQuery,
  useGetGamePortfolioQuery,
  useGetGamesQuery,
  useDeleteGameMutation,
  useGetGameByIdQuery,
} = gameApi;
