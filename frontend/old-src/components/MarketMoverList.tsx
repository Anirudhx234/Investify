import type Assets from "../types/Assets";
import type { ReactNode } from "react";

import formatVolume from "../util/volumeFormatter.ts";
import { Link } from "wouter";
import twMerge from "../util/twMerge.ts";

export interface MarketMoverListProps<T extends object> {
  title: string;
  data: T[] | undefined;
  errorMssg?: string | undefined;
  getKey: (item: T) => string;
  getDataHeading1: (item: T) => ReactNode;
  getDataHeading2: (item: T) => ReactNode;
  getDataContent1: (item: T) => ReactNode;
  getDataContent2: (item: T) => ReactNode;
}

export function MarketMoverList<T extends object>({
  title,
  data,
  errorMssg,
  getKey,
  getDataHeading1,
  getDataHeading2,
  getDataContent1,
  getDataContent2,
}: MarketMoverListProps<T>) {
  return (
    <div className="flex h-[25rem] w-[20rem] flex-col gap-4 overflow-hidden rounded-md bg-base-200 shadow-sm">
      <h2 className="p-4 text-center text-lg font-semibold">{title}</h2>
      {!data && (
        <div className="flex flex-col gap-4 h-full w-full items-center justify-center">
          <span className="loading loading-bars"></span>
          {errorMssg && <p className="text-error text-center">{errorMssg}</p>}
        </div>
      )}
      {data && (
        <div className="h-full w-full overflow-y-auto">
          <table className="table text-center">
            <tbody>
              {data.map((item) => (
                <tr key={getKey(item)}>
                  <th>
                    <Link
                      href={`/stocks/${getKey(item)}`}
                      className="link capitalize"
                    >
                      {getKey(item)}
                    </Link>
                  </th>
                  <td>
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-sm font-semibold text-gray-500">
                        {getDataHeading1(item)}
                      </p>
                      <p className="text-base">{getDataContent1(item)}</p>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-sm font-semibold text-gray-500">
                        {getDataHeading2(item)}
                      </p>
                      <p className="text-base">{getDataContent2(item)}</p>
                    </div>
                  </td>
                </tr>
              ))}
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
  errorMssg
}: {
  title: string;
  stocks: Assets.Stock[] | undefined;
  errorMssg?: string | undefined;
}) {
  return (
    <MarketMoverList
      title={title}
      data={stocks}
      errorMssg={errorMssg}
      getKey={(item) => item.ticker}
      getDataHeading1={() => "Volume"}
      getDataContent1={(item) => formatVolume(item.volume)}
      getDataHeading2={(item) => (
        <span
          className={twMerge(
            item.change_percentage[0] === "-" ? "text-error" : "text-success",
          )}
        >
          {item.change_percentage}
        </span>
      )}
      getDataContent2={(item) => `$${Math.round(item.price * 100) / 100}`}
    />
  );
}

export function MutualFundsList({
  title,
  mutualFunds,
  errorMssg
}: {
  title: string;
  mutualFunds: Assets.MutualFund[] | undefined;
  errorMssg?: string | undefined;
}) {
  return (
    <MarketMoverList
      title={title}
      data={mutualFunds}
      errorMssg={errorMssg}
      getKey={(mf) => mf.symbol}
      getDataHeading1={() => "Perform"}
      getDataContent1={(mf) => (
        <span className="text-success">{mf.performance_rating}</span>
      )}
      getDataHeading2={() => "Risk"}
      getDataContent2={(mf) => (
        <span className="text-error">{mf.risk_rating}</span>
      )}
    />
  );
}

export function EtfList({
  title,
  etfs,
  errorMssg
}: {
  title: string;
  etfs: Assets.Etf[] | undefined;
  errorMssg?: string | undefined;
}) {
  return (
    <MarketMoverList
      title={title}
      data={etfs}
      errorMssg={errorMssg}
      getKey={(etf) => etf.symbol}
      getDataHeading1={(etf) => etf.fund_type}
      getDataContent1={() => <></>}
      getDataHeading2={(etf) => etf.fund_family}
      getDataContent2={() => <></>}
    />
  );
}

export function CryptoList({
  title,
  crypto,
  errorMssg
}: {
  title: string;
  crypto: Assets.Crypto[] | undefined;
  errorMssg?: string | undefined;
}) {
  return (
    <MarketMoverList
      title={title}
      data={crypto}
      errorMssg={errorMssg}
      getKey={(item) => item.symbol}
      getDataHeading1={() => "Volume 24h"}
      getDataContent1={(item) => formatVolume(item.volume_24h)}
      getDataHeading2={(item) => (
        <span
          className={twMerge(
            item.percent_change_24h < 0 ? "text-error" : "text-success",
          )}
        >
          {Math.round(item.percent_change_24h * 100) / 100}%
        </span>
      )}
      getDataContent2={(item) => `$${Math.round(item.price * 100) / 100}`}
    />
  );
}
