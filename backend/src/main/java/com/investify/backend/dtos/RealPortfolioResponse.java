package com.investify.backend.dtos;

import lombok.Data;

import java.util.List;

@Data
public class RealPortfolioResponse {
    private String name;
    private double totalPortfolioValue;
    private double roi;
    private List<PortfolioAssetResponse> portfolioAssets;

    public RealPortfolioResponse(String name, double totalPortfolioValue, double roi, List<PortfolioAssetResponse> portfolioAssets) {
        this.name = name;
        this.totalPortfolioValue = totalPortfolioValue;
        this.roi = roi;
        this.portfolioAssets = portfolioAssets;
    }
}
