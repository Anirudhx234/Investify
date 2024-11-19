import { useParams } from "wouter";
import {
  useRiskReturnsQuery,
  useRiskScoreQuery,
  useSectorValuationsQuery,
} from "../api/portfolio";
import { useToastForRequests } from "../hooks/useToastForRequests";
import { AnalyticsPieChart } from "../components/AnalyticsPieChart";
import { AnalyticsRiskReturnChart } from "../components/AnalyticsRiskReturnChart";
import { AnalyticsRiskAssessmentTable } from "../components/AnalyticsRiskAssessmentTable";
import { AnalyticsHeatMap } from "../components/AnalyticsHeatMap";

export function PortfolioAnalytics() {
  const params = useParams() as { id: string };
  const { id } = params;

  const pieChartState = useSectorValuationsQuery({ portfolioId: id });
  const riskReturnsState = useRiskReturnsQuery({ portfolioId: id });
  const riskScoreState = useRiskScoreQuery({ portfolioId: id });

  const { isSuccess, component } = useToastForRequests(
    [
      {
        label: "Pie Chart",
        state: pieChartState,
      },
      {
        label: "Risk Return",
        state: riskReturnsState,
      },
      {
        label: "Risk Score",
        state: riskScoreState,
      },
    ],
    {
      backupSuccessMessage: "Retrieved analytics!",
    },
  );

  if (!isSuccess) return component;

  return (
    <div className="grid w-full grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-center gap-2 ~py-4/8">
        <h3 className="text-center text-lg font-semibold">Pie Chart</h3>

        <AnalyticsPieChart />
      </div>

      <div className="flex flex-col items-center gap-2 ~py-4/8">
        <h3 className="text-center text-lg font-semibold">
          Risk To Return Plot
        </h3>

        <AnalyticsRiskReturnChart />
      </div>

      <div className="flex flex-col items-center gap-2 ~py-4/8 lg:col-span-2">
        <h3 className="text-center text-lg font-semibold">Risk Assessment</h3>

        <AnalyticsRiskAssessmentTable />
      </div>

      <div className="flex flex-col items-center gap-2 ~py-4/8 lg:col-span-2">
        <h3 className="text-center text-lg font-semibold">Heatmap</h3>

        <AnalyticsHeatMap />
      </div>
    </div>
  );
}
