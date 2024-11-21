import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

/* API */
export const api = createApi({
  baseQuery,
  tagTypes: [
    "clients",
    "logged-in-client",
    "client-portfolios",
    "portfolios",
    "sector-valuations",
    "risk-charts",
    "risk-assessments",
    "client-game-portfolios-list",
    "client-available-games-list",
    "client-game-portfolios",
    "game-leaderboards",
  ],
  endpoints: () => ({}),
});
