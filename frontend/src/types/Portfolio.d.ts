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
  portfolioAssets: PortfolioAsset[];
  totalPortfolioValue: number;
}
