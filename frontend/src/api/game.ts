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
      invalidatesTags: ["logged-in-client-game-portfolios"],
    }),

    getGamePortfolio: build.query<gameTypes.GamePortfolio, { gameId: string }>({
      query: ({ gameId }) => ({
        url: `/games/${gameId}`,
        method: "GET",
      }),
    }),

    gamePortfolios: build.query<apiTypes.GamePortfoliosRes, void>({
      query: () => ({
        url: "/games/clients/me",
        method: "GET",
      }),
      providesTags: ["logged-in-client-game-portfolios"],
    }),

    availableGames: build.query<apiTypes.AvailableGamesRes, void>({
      query: () => ({
        url: "/games/clients/me/available-games",
        method: "GET",
      }),
      providesTags: ["logged-in-client-available-games"],
    }),

    joinGame: build.mutation<gameTypes.GamePortfolio, { gameId: string }>({
      query: ({ gameId }) => ({
        url: `/games/${gameId}/clients/me/join`,
        method: "POST",
      }),
      invalidatesTags: [
        "logged-in-client-game-portfolios",
        "logged-in-client-available-games",
      ],
    }),

    leaderboardData: build.query<gameTypes.Player[], { gameId: string }>({
      query: ({ gameId }) => ({
        url: `/games/${gameId}/leaderboard`,
        method: "GET",
      }),
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
} = gameApi;
