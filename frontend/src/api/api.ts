import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

/* API service */
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: () => ({}),
});
