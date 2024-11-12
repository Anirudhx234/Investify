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

  interface AssetDataRequest {
    symbol: string;
  }

  interface TimeSeriesRequest {
    symbol: string;
    interval: string;
  }

  interface TimeSeriesEntry {
    datetime: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }

  interface PriceDataEntry {
    symbol: string;
    datetime: string;
    price: number;
  }

  interface TimeSeriesResponse {
    values: {
      datetime: string;
      open: string;
      high: string;
      low: string;
      close: string;
      volume: string;
    }[];
  }

  interface PopularStocksResponse {
    top_gainers: Stock[];
    top_losers: Stock[];
    most_actively_traded: Stock[];
  }

  interface PopularMutualFundsResponse {
    result: { list: MutualFund[] };
  }

  interface PopularEtfsResponse {
    result: { list: Etf[] };
  }

  interface PopularCryptoResponse {
    crypto: Crypto[];
  }
}

export default Assets;
