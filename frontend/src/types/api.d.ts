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
