import { apiTypes, gameTypes } from "../types";
import { api } from "./api";

const gameApi = api.injectEndpoints({
  endpoints: (build) => ({
    createGame: build.mutation<void, Omit<gameTypes.Game, "id">>({
      query: ({ ...body }) => ({
        url: "/games/clients/me",
        method: "POST",
        body,
      }),
    }),

    gamePortfolios: build.query<apiTypes.GamePortfoliosRes, void>({
      query: () => ({
        url: "/games/clients/me",
        method: "GET",
      }),
    }),

    availableGames: build.query<gameTypes.Game[], void>({
      query: () => ({
        url: "/games/clients/me/available-games",
        method: "GET",
      }),
    }),

    joinGame: build.mutation<void, { gameId: string }>({
      query: ({ gameId }) => ({
        url: `/games/${gameId}/clients/me/join`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useAvailableGamesQuery,
  useCreateGameMutation,
  useGamePortfoliosQuery,
  useJoinGameMutation,
} = gameApi;
