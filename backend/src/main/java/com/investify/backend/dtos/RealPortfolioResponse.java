package com.investify.backend.dtos;

import lombok.Data;

import java.util.List;

@Data
public class RealPortfolioResponse {
    private List<PortfolioAssetResponse> portfolioAssets;
    private double totalPortfolioValue;

    public RealPortfolioResponse(List<PortfolioAssetResponse> portfolioAssets, double totalPortfolioValue) {
        this.portfolioAssets = portfolioAssets;
        this.totalPortfolioValue = totalPortfolioValue;
    }
}
