import { useParams } from "wouter";
import { useToastForRequest } from "../hooks/useToastForRequests";
import { RealPortfolioTable } from "../components/RealPortfolioTable";
import { RealPortfolioAddAssetForm } from "../forms/RealPortfolioAddAssetForm";
import { PortfolioAnalytics } from "../scenes/PortfolioAnalytics";
import { useGetRealPortfolioQuery } from "../api/portfolio";

export function RealPortfolioEditorPage() {
  const params = useParams() as { id: string };
  const { id } = params;

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
      <h1 className="text-center text-3xl font-bold">{data.name}</h1>

      <div className="divider"></div>

      <div className="flex flex-col items-center gap-4">
        <h2 className="text-center text-xl font-bold">Add Asset</h2>
        <RealPortfolioAddAssetForm />
      </div>

      <div className="divider"></div>

      <div className="flex flex-col items-center gap-4">
        <h2 className="text-center text-xl font-bold">Owned Assets</h2>
        <RealPortfolioTable id={id} />
      </div>

      <div className="divider"></div>

      <div className="flex flex-col items-center gap-4">
        <h2 className="text-center text-xl font-bold">Analytics</h2>
        <PortfolioAnalytics />
      </div>
    </div>
  );
}
