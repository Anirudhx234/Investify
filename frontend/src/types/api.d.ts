/* types for the complicated api endpoints */

import { Interval, Stock } from "./Asset";

export interface VerifyClientArgs {
  url: string;
  search?: string | object | undefined;
}

export interface ResetPasswordArgs {
  password: string;
  confirmPassword: string;
  search?: string | object | undefined;
}

export interface SignUpArgs {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export type AssetSearchRes = Record<string, Omit<Asset, "type">[]>;

export interface PopularStocksRes {
  top_gainers: Stock[];
  top_losers: Stock[];
  most_actively_traded: Stock[];
}

export interface TimeSeriesArgs {
  symbol: string;
  interval: Interval;
}

export interface TimeSeriesRes {
  values: {
    datetime: string;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
  }[];
}

export interface ClientPortfoliosRes {
  paperPortfolios: {
    name: string;
    id: string;
  }[];

  realPortfolios: {
    name: string;
    id: string;
  }[];
}

export interface CreatePortfolioArgs {
  name: string;
  buyingPower?: number | undefined;
}

export interface AddRealPortfolioAssetArgs {
  portfolioId: string;
  asset: {
    symbol: string;
    name: string;
    assetType: Type;
  };
  averageCost: number;
  quantity: number;
}

export interface ModifyRealPortfolioAssetArgs {
  portfolioId: string;
  assetId: string;
  averageCost: number;
  quantity: number;
}

export interface DeleteRealPortfolioAssetArgs {
  portfolioId: string;
  assetId: string;
}

export interface AddPaperPortfolioTradeArgs {
  portfolioId: string;
  asset: {
    symbol: string;
    name: string;
    assetType: Type;
  };
  type: "BUY" | "SELL";
  quantity: number;
}
