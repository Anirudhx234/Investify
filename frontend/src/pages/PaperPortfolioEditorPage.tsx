import { useToastForRequest } from "../hooks/useToastForRequests";
import { PortfolioAnalytics } from "../scenes/PortfolioAnalytics";
import { PaperPortfolioAddTradeForm } from "../forms/PaperPortfolioAddTradeForm";
import { PaperPortfolioAssetsTable, PaperPortfolioTradeHistoryTable } from "../components/PaperPortfolioTables";
import { useGetPaperPortfolioQuery } from "../api/portfolio";
import { PortfolioStats } from "../components/PortfolioStats";

export function PaperPortfolioEditorPage({
  id,
  disabled,
}: {
  id: string;
  disabled?: boolean | undefined;
}) {
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
        <h2 className="text-center text-2xl font-bold">{data.name}</h2>

        <PortfolioStats id={id} />
      </div>

      <div className="divider"></div>

      {!disabled && (
        <div className="flex flex-col items-center gap-8">
          <h2 className="text-center text-xl font-bold">Trade</h2>
          <PaperPortfolioAddTradeForm id={id} />
        </div>
      )}

      {!disabled && <div className="divider"></div>}

      <div className="flex flex-col items-center gap-8">
        <h2 className="text-center text-xl font-bold">Assets</h2>
        <PaperPortfolioAssetsTable id={id} />
      </div>

      <div className="divider"></div>

      <div className="flex flex-col items-center gap-8">
        <h2 className="text-center text-xl font-bold">Trade History</h2>
        <PaperPortfolioTradeHistoryTable id={id} />
      </div>

      <div className="divider"></div>

      <div className="flex flex-col items-center gap-8">
        <h2 className="text-center text-xl font-bold">Analytics</h2>
        <PortfolioAnalytics id={id} />
      </div>
    </div>
  );
}
