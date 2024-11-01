import { MdErrorOutline } from "react-icons/md";
import {
  useDeletePortfolioAssetMutation,
  useModifyPortfolioAssetMutation,
  usePortfolioAssetsQuery,
} from "../api/portfolio";
import { useEffect, useRef, useState } from "react";
import Modal from "../components/Modal";
import PieChartExample from '../components/PieChart'; 

export default function PortfolioPage() {
  const { data, isLoading, isError, error } = usePortfolioAssetsQuery({});
  const [deletePortfolioAsset] = useDeletePortfolioAssetMutation();
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

  return (
    <div className="mt-12 grid w-full">
      <h1 className="mb-4 w-full text-center font-bold ~text-lg/xl">
        Your Portfolio
      </h1>
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <h1>Sector Distribution</h1>
      <PieChartExample />
    </div>

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