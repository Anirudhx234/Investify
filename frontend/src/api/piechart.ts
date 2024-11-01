import type { SectorValuation } from "../types/SectorValuation"; 
import api from "./api";

const pieChartApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchSectorValuations: build.query<SectorValuation[], string>({
      // Set default to "me" if clientId is not provided
      query: (clientId = "me") => ({
        url: `/portfolios/${clientId}/sector-valuations`,
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchSectorValuationsQuery } = pieChartApi;

export default pieChartApi.reducer;
