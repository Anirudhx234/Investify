import { createApi } from "@reduxjs/toolkit/query";
import baseQuery from "./baseQuery";

/* API service */
export const api = createApi({
  baseQuery,
  tagTypes: ["auth"],
  endpoints: () => ({}),
});
