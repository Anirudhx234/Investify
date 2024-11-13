/* assets */

export type Type = "stocks" | "mutual-funds" | "etfs" | "crypto";

export interface Asset {
  type: Type;
  symbol: string;
  name: string;
}

export interface Stock {
  ticker: string;
  price: number;
  change_amount: number;
  change_percentage: string;
  volume: number;
}

export interface MutualFund {
  symbol: string;
  name: string;
  country: string;
  fund_family: string;
  fund_type: string;
  performance_rating: number;
  risk_rating: number;
  exchange: string;
  mic_code: string;
}

export interface Etf {
  symbol: string;
  name: string;
  country: string;
  mic_code: string;
  fund_family: string;
  fund_type: string;
}

export interface Crypto {
  symbol: string;
  name: string;
  price: number;
  volume_24h: number;
  percent_change_24h: number;
  market_cap: number;
}

export type Set = Record<Type, Omit<Asset, "type">[]>;
