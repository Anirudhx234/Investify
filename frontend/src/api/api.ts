import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

/* API */
export const api = createApi({
  baseQuery,
  tagTypes: ["clients", "logged-in-client", "client-portfolios"],
  endpoints: () => ({}),
});
