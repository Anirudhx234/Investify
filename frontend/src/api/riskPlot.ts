import api from "./api";
import RiskPoint = Risk.RiskPoint;

const riskPlotApi = api.injectEndpoints({
    endpoints: (build) => ({
        fetchRiskReturn: build.query<RiskPoint[], string>({
            // Set default to "me" if clientId is not provided
            query: (clientId = "me") => ({
                url: `/portfolios/${clientId}/risk-chart`,
                method: "GET",
            }),
        }),
    }),
});

export const { useFetchRiskReturnQuery } = riskPlotApi;

export default riskPlotApi.reducer;
