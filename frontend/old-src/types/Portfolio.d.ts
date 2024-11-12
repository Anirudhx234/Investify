import Assets from "./Assets";

/* types relating to portfolio */
declare namespace Portfolio {
  interface PortfolioAssetsResponse {
    portfolioAssets: {
      asset: {
        id: string;
        symbol: string;
        name: string;
        type: Assets.Type;
      };
      quantity: number;
      initialPrice: number;
      currentPrice: number;
      totalAssetValue: number;
    }[];
    totalPortfolioValue: number;
  }

  interface AddPortfolioAssetRequest {
    symbol: string;
    name: string;
    assetType: Assets.Type;
    initialPrice: number;
    quantity: number;
  }

  interface ModifyPortfolioRequest {
    clientId?: string | undefined;
    assetId: string;
    initialPrice: number;
    quantity: number;
  }

  interface DeletePortfolioRequest {
    clientId?: string | undefined;
    assetId: string;
  }
}

export default Portfolio;
