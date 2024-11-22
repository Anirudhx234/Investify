import { apiTypes, gameTypes } from "../types";
import {
  convertLocalTimeToUTC,
  convertUTCToLocalTime,
} from "../util/convertTimezone";
import { api } from "./api";

export function convertGameTimezones(game: gameTypes.Game) {
  return {
    ...game,
    startTime: convertUTCToLocalTime(game.startTime),
    endTime: convertUTCToLocalTime(game.endTime),
  };
}

export function convertGamePortfolioTimezones(
  gamePortfolio: gameTypes.GamePortfolio,
) {
  console.log(convertGameTimezones(gamePortfolio.game));
  return { ...gamePortfolio, game: convertGameTimezones(gamePortfolio.game) };
}

const gameApi = api.injectEndpoints({
  endpoints: (build) => ({
    createGame: build.mutation<gameTypes.Game, Omit<gameTypes.Game, "id">>({
      query: ({ ...body }) => ({
        url: "/games/clients/me",
        method: "POST",
        body: {
          ...body,
          startTime: convertLocalTimeToUTC(body.startTime),
          endTime: convertLocalTimeToUTC(body.endTime),
        },
      }),
      transformResponse: convertGameTimezones,
      invalidatesTags: ["client-game-portfolios-list"],
    }),

    getGamePortfolio: build.query<gameTypes.GamePortfolio, { gameId: string }>({
      query: ({ gameId }) => ({
        url: `/games/${gameId}/clients/me`,
        method: "GET",
      }),
      transformResponse: convertGamePortfolioTimezones,
      providesTags: (res) =>
        res ? [{ type: "client-game-portfolios", id: res.game.id }] : [],
    }),

    gamePortfolios: build.query<apiTypes.GamePortfoliosRes, void>({
      query: () => ({
        url: "/games/clients/me",
        method: "GET",
      }),
      transformResponse: (res: apiTypes.GamePortfoliosRes) => {
        for (let i = 0; i < res.activeGames.length; i++) 
          res.activeGames[i] = convertGamePortfolioTimezones(res.activeGames[i]);

        for (let i = 0; i < res.pastGames.length; i++) 
          res.pastGames[i] = convertGamePortfolioTimezones(res.pastGames[i]);

        for (let i = 0; i < res.upcomingGames.length; i++) 
          res.upcomingGames[i] = convertGamePortfolioTimezones(res.upcomingGames[i]);

        return res;
      },
      providesTags: ["client-game-portfolios-list"],
    }),

    availableGames: build.query<apiTypes.AvailableGamesRes, void>({
      query: () => ({
        url: "/games/clients/me/available-games",
        method: "GET",
      }),
      transformResponse: (res: apiTypes.AvailableGamesRes) => {
        for (let i = 0; i < res.activeGames.length; i++) 
          res.activeGames[i] = convertGameTimezones(res.activeGames[i]);

        for (let i = 0; i < res.upcomingGames.length; i++) 
          res.upcomingGames[i] = convertGameTimezones(res.upcomingGames[i]);

        return res;
      },
      providesTags: ["client-available-games-list"],
    }),

    joinGame: build.mutation<gameTypes.GamePortfolio, { gameId: string }>({
      query: ({ gameId }) => ({
        url: `/games/${gameId}/clients/me/join`,
        method: "POST",
      }),
      transformResponse: convertGamePortfolioTimezones,
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
