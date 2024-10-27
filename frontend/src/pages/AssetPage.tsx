import type Assets from "../types/Assets";

import { useParams } from "wouter";
import { useAssetMetaDataQuery } from "../api/assets";
import { MdErrorOutline } from "react-icons/md";
import DataTable from "../components/DataTable";

export default function AssetPage() {
  return (
    <div role="tablist" className="tabs-boxed tabs w-full bg-base-100">
      <input
        type="radio"
        name="asset_page_tabs"
        role="tab"
        className="tab"
        aria-label="Chart"
        defaultChecked
      />
      <div
        role="tabpanel"
        className="tab-content border-t-2 border-t-primary p-4"
      >
        <AssetPageChart />
      </div>

      <input
        type="radio"
        name="asset_page_tabs"
        role="tab"
        className="tab"
        aria-label="General"
        defaultChecked
      />
      <div
        role="tabpanel"
        className="tab-content border-t-2 border-t-primary p-4"
      >
        <AssetPageGeneral />
      </div>

      <input
        type="radio"
        name="asset_page_tabs"
        role="tab"
        className="tab"
        aria-label="Portfolio"
      />
      <div
        role="tabpanel"
        className="tab-content border-t-2 border-t-primary p-4"
      >
        <AssetPagePortfolio />
      </div>
    </div>
  );
}

function AssetPageChart() {
  return <></>;
}

function AssetPageGeneral() {
  const params = useParams() as { type: Assets.Type; symbol: string };
  const { data, isError, error, isSuccess } = useAssetMetaDataQuery(params);

  const errorMssg = error?.message || "An error occurred";

  if (isSuccess) {
    return <DataTable data={data} />;
  }

  if (isError) {
    return (
      <div className="flex items-center gap-1 text-error">
        <MdErrorOutline />
        <p>{errorMssg}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="loading loading-spinner"></span>Loading...
    </div>
  );
}

function AssetPagePortfolio() {
  return <>Add to portfolio</>;
}
