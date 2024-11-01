declare namespace Risk {
    interface RiskPoint {
        name: string;
        risk: number; // X-axis (risk level)
        return: number; // Y-axis (return level)
    }

    interface RiskScore {
        overallRiskScore: number,
        assetsByRisk:
            {
                portfolioAsset: {
                    id: string,
                    asset: {
                        id: string,
                        symbol: string,
                        name: string,
                        type: string,
                    },
                    initialPrice: number,
                    quantity: number
                },
                riskScore: number
            }[]
    }
}