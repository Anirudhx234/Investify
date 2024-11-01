package com.investify.backend.dtos;

import com.investify.backend.entities.PortfolioAsset;
import lombok.Data;

@Data
public class AssetRiskDetail {
    private PortfolioAsset portfolioAsset;
    private double riskScore;

    public AssetRiskDetail(PortfolioAsset portfolioAsset, double riskScore) {
        this.portfolioAsset = portfolioAsset;
        this.riskScore = riskScore;
    }
}