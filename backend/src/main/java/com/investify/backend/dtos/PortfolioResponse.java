package com.investify.backend.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
public class PortfolioResponse {
    private String name;
    private double totalPortfolioValue;
    private double roi;
    private List<PortfolioAssetResponse> portfolioAssets;

    public PortfolioResponse(String name, double totalPortfolioValue, double roi, List<PortfolioAssetResponse> portfolioAssets) {
        this.name = name;
        this.totalPortfolioValue = totalPortfolioValue;
        this.roi = roi;
        this.portfolioAssets = portfolioAssets;
    }
}
