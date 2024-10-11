import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

/* API service */
export const api = createApi({
  baseQuery,
  tagTypes: ["Profile"],
  endpoints: () => ({}),
});
