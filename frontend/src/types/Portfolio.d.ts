import { Asset } from "./Asset";

export interface PortfolioAsset {
  id: string;
  quantity: number;
  averageCost: number;
  currentPrice: number;
  totalAssetValue: number;
  asset: Asset & { id: string };
}

export interface PaperPortfolioTrade {
  id: string;
  asset: Asset & { id: string };
  time: string;
  type: "BUY" | "SELL";
  price: number;
  quantity: number;
  totalPortfolioValue: number;
}

export interface RealPortfolio {
  name: string;
  totalPortfolioValue: number;
  roi: number;
  portfolioAssets?: PortfolioAsset[] | undefined | null;
}

export interface PaperPortfolio extends RealPortfolio {
  buyingPower: number;
  trades: PaperPortfolioTrade[];
}

export interface SectorValuations {
  name: string;
  totalValuation: number;
}

export interface RiskPoint {
  name: string;
  risk: number; // X-axis (risk level)
  return: number; // Y-axis (return level)
}

export interface RiskScore {
  overallRiskScore: number;
  assetsByRisk: [
    {
      portfolioAsset: Omit<PortfolioAsset, "currentPrice" | "totalAssetValue">;
      riskScore: number;
    },
  ];
}
