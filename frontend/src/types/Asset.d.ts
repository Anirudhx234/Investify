declare namespace Asset {
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

  type ETF = Asset;
  type Crypto = Asset;

  type Set = Record<Type, Asset[]>;
}

export default Asset;
