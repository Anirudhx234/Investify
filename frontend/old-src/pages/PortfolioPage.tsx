import { MdErrorOutline, MdOutlineError } from "react-icons/md";
import {
  useDeletePortfolioAssetMutation,
  useModifyPortfolioAssetMutation,
  usePortfolioAssetsQuery,
  useTotalPortfolioValueQuery,
  useRoiQuery,
} from "../api/portfolio";
import { useEffect, useRef, useState } from "react";
import Modal from "../components/Modal";
import PieChartExample from "../components/PieChart";
import RiskToReturnPlot from "../components/RiskToReturnPlot.tsx";
import DataTable from "../components/DataTable.tsx";
import { useFetchRiskScoreQuery } from "../api/riskPlot.ts";
import useAppSelector from "../hooks/useAppSelector.ts";
import type { RootState } from "../app/store.ts";

export default function PortfolioPage() {
  const clientId =
    useAppSelector((state: RootState) => state.client.id) || "me";

  const { data, isLoading, isError, error } = usePortfolioAssetsQuery({});
  const { data: riskData } = useFetchRiskScoreQuery(clientId);
  const [deletePortfolioAsset] = useDeletePortfolioAssetMutation();
  const { data: totalPortfolioValue } = useTotalPortfolioValueQuery({});
  const { data: roi } = useRoiQuery({});
  const [modifyPortfolio, modifyPortfolioState] =
    useModifyPortfolioAssetMutation();
  const modalRef = useRef<HTMLDialogElement>(null);

  const [assetsInfo, setAssetsinfo] = useState<
    {
      initialPrice: number;
      quantity: number;
    }[]
  >([]);

  useEffect(() => {
    setAssetsinfo(data?.portfolioAssets ?? []);
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <span className="loading loading-spinner"></span>
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center gap-1 text-error">
        <MdErrorOutline />
        <p>{error.message}</p>
      </div>
    );
  }

  const renderHeatMap = () => {
    if (!data?.portfolioAssets || data.portfolioAssets.length === 0) {
      return <p>No assets available for the heat map.</p>;
    }

    return (
      <div className="flex flex-wrap items-center justify-center gap-8">
        {data.portfolioAssets.map((item) => {
          const changePercentage =
            ((item.currentPrice - item.initialPrice) / item.initialPrice) * 100;
          const color = changePercentage > 0 ? "bg-green-500" : "bg-red-500";

          return (
            <div
              key={item.asset.id}
              className={`flex flex-col items-center justify-center rounded p-4 ${color}`}
              style={{ width: "100px", height: "100px" }}
            >
              <h3 className="text-white">{item.asset.symbol}</h3>
              <p className="text-white">
                Price: ${item.currentPrice.toFixed(2)}
              </p>
              <p className="text-white">{changePercentage.toFixed(2)}%</p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="mt-12 grid w-full">
      <h1 className="mb-4 w-full text-center font-bold ~text-lg/xl">
        Your Portfolio
      </h1>
      <div className="mb-6 text-center">
        <p className="text-lg font-semibold">
          Total Portfolio Value: ${totalPortfolioValue?.toFixed(2) ?? "0.00"}
        </p>
        <p className="text-lg font-semibold">
          Return on Investment (ROI): {roi?.toFixed(2) ?? "0.00"}
        </p>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>N</th>
            <th>Symbol</th>
            <th>Name</th>
            <th>Type</th>
            <th>Initial Price</th>
            <th>Current Price</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.portfolioAssets.map((item, idx) => (
            <tr key={item.asset.id}>
              <th>{idx + 1}</th>
              <td>{item.asset.symbol}</td>
              <td>{item.asset.name}</td>
              <td>{item.asset.type}</td>
              <td>
                <input
                  className="input input-sm input-bordered"
                  type="number"
                  min={0}
                  placeholder="Initial Price"
                  name="initialPrice"
                  value={assetsInfo[idx]?.initialPrice ?? 0}
                  disabled={modifyPortfolioState.isLoading}
                  onChange={(e) =>
                    setAssetsinfo(
                      assetsInfo.map((innerItem, innerIdx) =>
                        idx === innerIdx
                          ? {
                              ...innerItem,
                              initialPrice:
                                parseFloat(e.target.value || "0") ?? 0,
                            }
                          : { ...innerItem },
                      ),
                    )
                  }
                ></input>
              </td>
              <td>{item.currentPrice}</td>
              <td>
                <input
                  className="input input-sm input-bordered"
                  type="number"
                  min={0}
                  placeholder="Quantity"
                  name="quantity"
                  value={assetsInfo[idx]?.quantity ?? 0}
                  disabled={modifyPortfolioState.isLoading}
                  onChange={(e) =>
                    setAssetsinfo(
                      assetsInfo.map((innerItem, innerIdx) =>
                        idx === innerIdx
                          ? {
                              ...innerItem,
                              quantity: parseFloat(e.target.value || "0") ?? 0,
                            }
                          : { ...innerItem },
                      ),
                    )
                  }
                ></input>
              </td>
              <td className="flex items-center gap-2">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={async () => {
                    try {
                      await modifyPortfolio({
                        assetId: item.asset.id,
                        initialPrice: assetsInfo[idx]?.initialPrice,
                        quantity: assetsInfo[idx]?.quantity,
                      }).unwrap();
                    } catch {
                      /* empty */
                    }

                    modalRef.current?.showModal();
                  }}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() =>
                    deletePortfolioAsset({ assetId: item.asset.id })
                  }
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data?.portfolioAssets?.length ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className={"grid w-full grid-cols-2 pt-10"}>
            <div className={"flex flex-col"}>
              <h1>Sector Distribution</h1>
              <PieChartExample />
            </div>
            <RiskToReturnPlot />
          </div>

          {riskData && <DataTable data={riskData} />}
          <h2 className="mt-8 text-center font-bold">Portfolio Heat Map</h2>
          {renderHeatMap()}
        </div>
      ) : (
        <div className="flex items-center gap-1 text-error justify-center w-full mt-8">
          <MdOutlineError />
          <p>No portfolio data available for Pie chart, Risk to return chart, Risk assessment, and Heatmap</p>
        </div>
      )}

      <Modal
        ref={modalRef}
        onExit={() => modalRef.current?.close()}
        title={!modifyPortfolioState.isError ? "Success!" : "Error"}
      >
        <p className="py-4">
          {!modifyPortfolioState.isError
            ? "Asset Modified!"
            : modifyPortfolioState.error.message}
        </p>
      </Modal>
    </div>
  );
}
