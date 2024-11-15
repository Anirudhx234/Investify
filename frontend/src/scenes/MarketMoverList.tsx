import type { assetTypes } from "../types";
import type { ReactNode } from "react";

import { formatNumber } from "../util/formatNumber";
import { Link } from "wouter";
import { twMerge } from "../util/twMerge";
import { getLastPartOfUrl } from "../util/getLastPartOfUrl";
import { convertSymbolToRoute } from "../util/convertAsset";

export interface MarketMoverListProps<T extends object> {
  title: string;
  data: T[] | undefined;
  getKey: (item: T) => string;
  getContent: (item: T) => [ReactNode, ReactNode, ReactNode, ReactNode];
}

export function MarketMoverList<T extends object>({
  title,
  data,
  getKey,
  getContent,
}: MarketMoverListProps<T>) {
  return (
    <div
      className={twMerge(
        data && "flex aspect-[4/5] flex-col gap-4 rounded-md bg-base-200 p-2 shadow-sm ~w-80/96",
        !data && "skeleton aspect-[4/5] ~w-80/96",
      )}
    >
      <h2 className="p-4 text-center text-lg font-semibold">{title}</h2>
      {data && (
        <div className="h-full w-full overflow-y-auto">
          <table className="table text-center">
            <tbody>
              {data.map((item) => {
                const key = getKey(item);
                const content = getContent(item);

                return (
                  <tr key={key}>
                    <th className="max-w-[10ch] overflow-hidden truncate text-ellipsis whitespace-nowrap">
                      <Link href={`/assets/${key}`} className="link">
                        {getLastPartOfUrl(key)}
                      </Link>
                    </th>
                    <td>
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-sm font-semibold text-gray-500">
                          {content[0]}
                        </p>
                        <p className="text-base">{content[1]}</p>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-sm font-semibold text-gray-500">
                          {content[2]}
                        </p>
                        <p className="text-base">{content[3]}</p>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function StocksList({
  title,
  stocks,
}: {
  title: string;
  stocks: assetTypes.Stock[] | undefined;
}) {
  return (
    <MarketMoverList
      title={title}
      data={stocks}
      getKey={(stock) => `stocks/${convertSymbolToRoute(stock.ticker)}`}
      getContent={(stock) => [
        "Volume",
        formatNumber(stock.volume),
        <span
          className={twMerge(
            stock.change_percentage[0] === "-" ? "text-error" : "text-success",
          )}
        >
          {formatNumber(stock.change_percentage)}%
        </span>,
        `$${formatNumber(stock.price)}`,
      ]}
    />
  );
}

export function MutualFundsList({
  title,
  mutualFunds,
}: {
  title: string;
  mutualFunds: assetTypes.MutualFund[] | undefined;
}) {
  return (
    <MarketMoverList
      title={title}
      data={mutualFunds}
      getKey={(mf) => `mutual-funds/${convertSymbolToRoute(mf.symbol)}`}
      getContent={(mf) => [
        "Perform",
        <span className="text-success">{mf.performance_rating}</span>,
        "Risk",
        <span className="text-error">{mf.risk_rating}</span>,
      ]}
    />
  );
}

export function EtfList({
  title,
  etfs,
}: {
  title: string;
  etfs: assetTypes.Etf[] | undefined;
}) {
  return (
    <MarketMoverList
      title={title}
      data={etfs}
      getKey={(etf) => `etfs/${convertSymbolToRoute(etf.symbol)}`}
      getContent={(etf) => [etf.fund_type, <></>, etf.fund_family, <></>]}
    />
  );
}

export function CryptoList({
  title,
  crypto,
}: {
  title: string;
  crypto: assetTypes.Crypto[] | undefined;
  errorMssg?: string | undefined;
}) {
  return (
    <MarketMoverList
      title={title}
      data={crypto}
      getKey={(asset) => `crypto/${convertSymbolToRoute(asset.symbol)}`}
      getContent={(asset) => [
        "Volume 24h",
        formatNumber(asset.volume_24h),
        <span
          className={twMerge(
            asset.percent_change_24h < 0 ? "text-error" : "text-success",
          )}
        >
          {formatNumber(asset.percent_change_24h)}%
        </span>,
        `$${formatNumber(asset.price)}`,
      ]}
    />
  );
}
