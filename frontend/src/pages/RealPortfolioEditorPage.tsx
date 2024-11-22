import { useToastForRequest } from "../hooks/useToastForRequests";
import { RealPortfolioTable } from "../components/RealPortfolioTable";
import { RealPortfolioAddAssetForm } from "../forms/RealPortfolioAddAssetForm";
import { PortfolioAnalytics } from "../scenes/PortfolioAnalytics";
import { useGetRealPortfolioQuery } from "../api/portfolio";
import { PortfolioStats } from "../components/PortfolioStats";

export function RealPortfolioEditorPage({ id }: { id: string }) {
  const portfolioState = useGetRealPortfolioQuery({ id });
  const data = portfolioState.data;

  const { component, isSuccess } = useToastForRequest(
    "Real Portfolio",
    portfolioState,
    { backupSuccessMessage: "Retrieved real portfolio!" },
  );

  if (!isSuccess || !data) return component;
  return (
    <div className="flex w-full flex-col ~gap-4/8">
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-center text-2xl font-bold">{data.name}</h2>

        <PortfolioStats id={id} />
      </div>

      <div className="divider"></div>

      <div className="flex flex-col items-center gap-8">
        <h2 className="text-center text-xl font-bold">Add Asset</h2>
        <RealPortfolioAddAssetForm id={id} />
      </div>

      <div className="divider"></div>

      {data.portfolioAssets && (
        <div className="flex flex-col items-center gap-8">
          <h2 className="text-center text-xl font-bold">Owned Assets</h2>
          <RealPortfolioTable id={id} />
        </div>
      )}

      {data.portfolioAssets && <div className="divider"></div>}

      <div className="flex flex-col items-center gap-8">
        <h2 className="text-center text-xl font-bold">Analytics</h2>
        <PortfolioAnalytics id={id} />
      </div>
    </div>
  );
}
