import type { apiTypes, gameTypes } from "../types";
import { api } from "./api";

const gameApi = api.injectEndpoints({
    endpoints: (build) => ({
        // getGames: build.query<gameTypes.Game[], void>({
        //     query: () => ({
        //         url: "/games",
        //         method: "GET",
        //     }),
        //     providesTags: ["games"],
        // }),

        // createGame: build.mutation<void, gameTypes.CreateGameArgs>({
        //     query: ({ name, startTime, endTime, buyingPower }) => ({
        //         url: "/games",
        //         method: "POST",
        //         body: { name, startTime, endTime, buyingPower },
        //     }),
        //     invalidatesTags: ["games"],
        // }),


        getGames: build.query<gameTypes.GamePortfolioResponse, void>({
            query: () => ({
                url: `/games/clients/me`,
                method: "GET",
            }),
            providesTags: ["games"],
        }),

        createGame: build.mutation<void, gameTypes.CreateGameArgs>({
            query: ({ request }) => ({
                url: `/games/clients/me`,
                method: "POST",
                body: request,
            }),
            invalidatesTags: ["games"], // Adjust if cache tags are more specific
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

        joinGame: build.mutation<void, { gameId: string }>({
            query: ({ gameId }) => ({
                url: `/games/${gameId}/clients/me/join`,
                method: "POST",
            }),
        }),
    }),
});

export const {
    useGetGamesQuery,
    useCreateGameMutation,
    useDeleteGameMutation,
    useGetGameByIdQuery,
    useJoinGameMutation,
} = gameApi;
