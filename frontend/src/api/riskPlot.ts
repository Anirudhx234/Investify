import api from "./api";
import RiskPoint = Risk.RiskPoint;
import RiskScore = Risk.RiskScore;

const riskPlotApi = api.injectEndpoints({
    endpoints: (build) => ({
        fetchRiskReturn: build.query<RiskPoint[], string>({
            // Set default to "me" if clientId is not provided
            query: (clientId = "me") => ({
                url: `/portfolios/${clientId}/risk-chart`,
                method: "GET",
            }),
        }),
        fetchRiskScore: build.query<RiskScore[], string>({
            // Set default to "me" if clientId is not provided
            query: (clientId = "me") => ({
                url: `/portfolios/${clientId}/risk-assessment`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useFetchRiskReturnQuery,
    useFetchRiskScoreQuery
} = riskPlotApi;
export default riskPlotApi.reducer;