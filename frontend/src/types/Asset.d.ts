declare namespace Assets {
  interface Asset {
    type: "stocks" | "mutual-funds" | "bonds" | "crypto";
    symbol: string;
    name: string;
  }

  interface Stock extends Asset {
    ticker: string;
    price: number;
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

  type Bonds = Asset;
  type Crypto = Asset;

  type Set = Record<"stocks" | "mutual-funds" | "bonds" | "crypto", Asset[]>;
}

export default Assets;
