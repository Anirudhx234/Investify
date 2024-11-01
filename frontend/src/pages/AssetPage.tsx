import type Assets from "../types/Assets";

import { useParams } from "wouter";
import {useAssetMetaDataQuery, useScraperQuery} from "../api/assets";
import { MdErrorOutline } from "react-icons/md";
import DataTable from "../components/DataTable";
import AssetPageChart from "../scenes/AssetPageChart";

export default function AssetPage() {
  const params = useParams() as { symbol: string };

  return (
    <div className="flex w-full flex-col gap-4">
      <h1 className="ml-8 font-bold ~text-lg/xl">{params.symbol}</h1>
      <div
        role="tablist"
        className="tabs-boxed tabs tabs-sm w-full bg-base-100 lg:tabs-md"
      >
        <input
          type="radio"
          name="asset-page-tablist"
          role="tab"
          className="tab ml-4"
          aria-label="General"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content w-full border-t-2 border-t-primary ~p-2/4"
        >
          <AssetPageGeneral />
        </div>

        <input
          type="radio"
          name="asset-page-tablist"
          role="tab"
          className="tab"
          aria-label="Chart"
        />
        <div
          role="tabpanel"
          className="tab-content w-full border-t-2 border-t-primary ~p-2/4"
        >
          <AssetPageChart />
        </div>

        <input
          type="radio"
          name="asset-page-tablist"
          role="tab"
          className="tab"
          aria-label="Portfolio"
        />
        <div
          role="tabpanel"
          className="tab-content w-full border-t-2 border-t-primary ~p-2/4"
        >
          <AssetPagePortfolio />
        </div>

        <input
            type="radio"
            name="asset-page-tablist"
            role="tab"
            className="tab"
            aria-label="News"
        />
        <div
            role="tabpanel"
            className="tab-content w-full border-t-2 border-t-primary ~p-2/4"
        >
          <AssetPageNews />
        </div>
      </div>
    </div>
  );
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

function AssetPageNews() {
  const params = useParams() as { symbol: string };
  const { data: articles, error, isLoading } = useScraperQuery(params);

  const styles = {
    list: {
      listStyleType: 'none',
      padding: 0,
      margin: '20px 0',
    },
    listItem: {
      marginBottom: '10px',
    },
    link: {
      textDecoration: 'none',
      color: '#00aeff',
      fontWeight: 'bold',
      transition: 'color 0.3s',
    },
    linkHover: {
      color: '#0056b3',
      textDecoration: 'underline',
    },
  };

  const handleMouseOver = (e) => {
    e.currentTarget.style.color = styles.linkHover.color;
    e.currentTarget.style.textDecoration = styles.linkHover.textDecoration;
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.color = styles.link.color;
    e.currentTarget.style.textDecoration = styles.link.textDecoration;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching articles</div>;

  return (
      <div>
        <h1>News surrounding the {params.symbol} stock:</h1>
        <ul style={styles.list}>
          {!articles && <div>No recent news available for this asset</div>}
          {articles?.map(([title, url], index) => (
              <li key={index} style={styles.listItem}>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.link}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                >
                  {title}
                </a>
              </li>
          ))}
        </ul>
      </div>
  );
}
