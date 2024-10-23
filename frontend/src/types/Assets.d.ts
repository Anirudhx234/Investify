/* asset types */
declare namespace Assets {
  type Type = "stocks" | "mutual-funds" | "etfs" | "crypto";

  interface Asset {
    type: Type;
    symbol: string;
    name: string;
  }

  interface Stock extends Asset {
    ticker: string;
    change_amount: number;
    change_percentage: number;
    volume: number;
  }

  interface MutualFund extends Asset {
    country: string;
    fund_family: string;
    fund_type: string;
    performance_rating: number;
    risk_rating: number;
    exchange: string;
    mic_code: string;
  }

  interface Etf extends Asset {
    country: string;
    mic_code: string;
    fund_family: string;
    fund_type: string;
  }

  interface Crypto extends Asset {
    price: number;
    volume_24h: number;
    percent_change_24h: number;
    market_cap: number;
  }

  type Set = Record<Type, Asset[]>;
}

export default Assets;
