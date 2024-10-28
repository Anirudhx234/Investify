import type Assets from "../types/Assets";
import type { ReactNode } from "react";

import formatVolume from "../util/volumeFormatter.ts";
import { Link } from "wouter";
import twMerge from "../util/twMerge.ts";

export interface MarketMoverListProps<T extends object> {
  title: string;
  data: T[];
  getKey: (item: T) => string;
  getDataHeading1: (item: T) => ReactNode;
  getDataHeading2: (item: T) => ReactNode;
  getDataContent1: (item: T) => ReactNode;
  getDataContent2: (item: T) => ReactNode;
}

export function MarketMoverList<T extends object>({
  title,
  data,
  getKey,
  getDataHeading1,
  getDataHeading2,
  getDataContent1,
  getDataContent2,
}: MarketMoverListProps<T>) {
  return (
    <div className="card h-80 w-80 overflow-y-auto">
      <h2 className="card-title">{title}</h2>
      <div className="card-body">
        <table className="table table-zebra">
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
    </div>
  );
}

export function StocksList({
  title,
  stocks,
}: {
  title: string;
  stocks: Assets.Stock[];
}) {
  return (
    <MarketMoverList
      title={title}
      data={stocks}
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
      getDataContent2={(item) => `$${item.price.toFixed(2)}`}
    />
  );
}

export function MutualFundsList({
  title,
  mutualFunds,
}: {
  title: string;
  mutualFunds: Assets.MutualFund[];
}) {
  return (
    <MarketMoverList
      title={title}
      data={mutualFunds}
      getKey={(mf) => mf.symbol}
      getDataHeading1={() => "Performance"}
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
}: {
  title: string;
  etfs: Assets.Etf[];
}) {
  return (
    <MarketMoverList
      title={title}
      data={etfs}
      getKey={(etf) => etf.symbol}
      getDataHeading1={() => "Type"}
      getDataContent1={(etf) => etf.fund_type}
      getDataHeading2={() => "Family"}
      getDataContent2={(etf) => etf.fund_family}
    />
  );
}

export function CryptoList({
  title,
  crypto,
}: {
  title: string;
  crypto: Assets.Crypto[];
}) {
  return (
    <MarketMoverList
      title={title}
      data={crypto}
      getKey={(item) => item.symbol}
      getDataHeading1={() => "Volume 24h"}
      getDataContent1={(item) => formatVolume(item.volume_24h)}
      getDataHeading2={(item) => (
        <span
          className={twMerge(
            item.percent_change_24h < 0 ? "text-error" : "text-success",
          )}
        >
          {item.percent_change_24h.toFixed(2)}
        </span>
      )}
      getDataContent2={(item) => `$${item.price.toFixed(2)}`}
    />
  );
}