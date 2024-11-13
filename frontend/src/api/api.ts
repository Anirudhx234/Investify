import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

/* API */
const api = createApi({
  baseQuery,
  tagTypes: ["clients", "logged-in-client"],
  endpoints: () => ({}),
});

export default api;
