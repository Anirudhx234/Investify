/* asset types */
declare namespace Assets {
  type SearchMenuItems = Record<
    string,
    { items: { link: string; label: string }[] }
  >;

  type Type = "stocks" | "mutual-funds" | "etfs" | "crypto";

  interface Asset {
    type: Type;
    symbol: string;
    name: string;
  }

  interface Stock {
    ticker: string;
    price: number;
    change_amount: number;
    change_percentage: string;
    volume: number;
  }

  interface MutualFund {
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

  interface Etf {
    symbol: string;
    name: string;
    country: string;
    mic_code: string;
    fund_family: string;
    fund_type: string;
  }

  interface Crypto {
    symbol: string;
    name: string;
    price: number;
    volume_24h: number;
    percent_change_24h: number;
    market_cap: number;
  }

  type Set = Record<Type, Omit<Asset, "type">[]>;

  interface MetaDataRequest {
    type: Type;
    symbol: string;
  }

  interface ChartDataRequest {
    type: Type;
    symbol: string;
    interval: string;
  }

  interface ChartDataEntry {
    datetime: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }

  interface ChartData {
    values: ChartDataEntry[];
  }
}

export default Assets;
