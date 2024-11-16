import { Redirect, Route, Switch, useParams } from "wouter";
import { selectIsLoggedIn } from "../features/clientSlice";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAssetNewsQuery, useAssetOneDayQuoteQuery } from "../api/assets";
import { assetIcons } from "../components/assetIcons";
import { convertAssetTypeToLabel } from "../util/convertAsset";
import { ObjectTable } from "../components/ObjectTable";
import { AssetPageChart } from "../scenes/AssetPageChart";
import { useToastForRequest } from "../hooks/useToastForRequests";

export function AssetPage() {
  const params = useParams() as { symbol: string; type: string };
  const { symbol, type } = params;
  const label = convertAssetTypeToLabel(type);

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <div className="w-full">
      <h1 className="mx-5 text-2xl font-bold">{symbol}</h1>
      <div className="mx-4 mt-0.5 flex items-center gap-1">
        <span>{assetIcons[label]}</span>
        <span className="capitalize">{label}</span>
      </div>

      <div className="divider"></div>

      <Switch>
        <Route path="/general" component={AssetPageGeneral} />
        <Route path="/line-chart" component={AssetPageChart} />
        <Route path="/candle-chart" component={AssetPageChart} />
        <Route path="/news" component={AssetPageNews} />
        {isLoggedIn && (
          <Route path="/portfolio" component={() => <>Portfolio</>} />
        )}
        <Route
          path="*"
          component={() => <Redirect to="/general" replace />}
        ></Route>
      </Switch>
    </div>
  );
}

export function AssetPageGeneral() {
  const params = useParams() as { symbol: string; type: string };
  const { symbol } = params;
  const assetQuoteState = useAssetOneDayQuoteQuery({ symbol });

  const { component, isSuccess } = useToastForRequest(symbol, assetQuoteState, {
    backupSuccessMessage: `Retrieved ${symbol} info!`,
  });

  if (!isSuccess) return component;

  const data = assetQuoteState.data;
  const entries = Object.entries(data ?? {});

  return (
    <div className="grid w-full grid-cols-1 ~gap-4/8 lg:grid-cols-2">
      <div className="flex flex-col ~gap-2/4">
        <h2 className="text-center font-bold capitalize">over the last day</h2>

        <ObjectTable
          data={entries.filter(([, val]) => typeof val !== "object")}
        />
      </div>

      <div className="flex flex-col ~gap-4/8">
        {entries
          .filter(([, val]) => typeof val === "object")
          .map(([attr, val]) => (
            <div key={attr} className="flex flex-col ~gap-2/4">
              <h2 className="text-center font-bold capitalize">
                {attr.split("_").join(" ")}
              </h2>

              <ObjectTable data={val} />
            </div>
          ))}
      </div>
    </div>
  );
}

function AssetPageNews() {
  const params = useParams() as { symbol: string };
  const { symbol } = params;

  const assetNewsState = useAssetNewsQuery({ symbol });
  const data = assetNewsState.data;

  const { component } = useToastForRequest(`${symbol} News`, assetNewsState, {
    backupSuccessMessage: `Retrieved ${symbol} updates!`,
  });

  return (
    <div>
      <h2 className="m-4 text-lg font-semibold">
        News surrounding the {params.symbol} stock:
      </h2>
      <ul className="mx-4 flex flex-col gap-4">
        {component}
        {data?.length === undefined && <p>No news found for {symbol}</p>}
        {data?.map(([title, url]) => (
          <li key={url}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="link link-primary transition-colors hover:link-secondary"
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
