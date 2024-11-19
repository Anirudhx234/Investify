import { useParams } from "wouter";
import { useToastForRequest } from "../hooks/useToastForRequests";
import { PortfolioAnalytics } from "../scenes/PortfolioAnalytics";
import { PaperPortfolioAddTradeForm } from "../forms/PaperPortfolioAddTradeForm";
import { PaperPortfolioTable } from "../components/PaperPortfolioTable";
import { useGetPaperPortfolioQuery } from "../api/portfolio";
import { PortfolioStats } from "../components/PortfolioStats";

export function PaperPortfolioEditorPage() {
  const params = useParams() as { id: string };
  const { id } = params;
  const portfolioState = useGetPaperPortfolioQuery({ id });
  const data = portfolioState.data;

  const { component, isSuccess } = useToastForRequest(
    "Paper Portfolio",
    portfolioState,
    { backupSuccessMessage: "Retrieved paper portfolio!" },
  );

  if (!isSuccess || !data) return component;
  return (
    <div className="flex w-full flex-col ~gap-4/8">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-center text-3xl font-bold">{data.name}</h1>

        <PortfolioStats id={id} />
      </div>

      <div className="divider"></div>

      <div className="flex flex-col items-center gap-8">
        <h2 className="text-center text-xl font-bold">Trade</h2>
        <PaperPortfolioAddTradeForm />
      </div>

      <div className="divider"></div>

      <div className="flex flex-col items-center gap-8">
        <h2 className="text-center text-xl font-bold">Trade History</h2>
        <PaperPortfolioTable id={id} />
      </div>

      <div className="divider"></div>

      <div className="flex flex-col items-center gap-8">
        <h2 className="text-center text-xl font-bold">Analytics</h2>
        <PortfolioAnalytics />
      </div>
    </div>
  );
}
