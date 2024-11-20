import {api} from "./api.ts";
import {Player} from "../types/Game";

const gameApi = api.injectEndpoints({
    endpoints: (build) => ({
        leaderboardData: build.query<Player[], { gameId: string }>({
            query: ({gameId}) => ({
                url: "/games/" + gameId + "/leaderboard",
                method: "GET",
            })
        }),
    }),
});

export const {
    useLeaderboardDataQuery
} = gameApi;