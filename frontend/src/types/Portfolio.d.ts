import { Asset } from "./Asset";

export interface PortfolioAsset {
  id: string;
  quantity: number;
  averageCost: number;
  currentPrice: number;
  totalAssetValue: number;
  asset: Asset & { id: string };
}

export interface Portfolio {
  name: string;
  totalPortfolioValue: number;
  portfolioAssets: PortfolioAsset[];
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
