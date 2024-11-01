import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

/* API */
const api = createApi({
  baseQuery,
  tagTypes: ["clients", "asset-metadata", "portfolios", "pie-chart", "roi", "portfolio-value", "risk-chart", "risk-assessment"],
  endpoints: () => ({}),
});

export default api;
