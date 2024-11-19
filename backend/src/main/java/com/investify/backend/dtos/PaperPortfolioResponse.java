package com.investify.backend.dtos;

import lombok.Data;

import java.util.List;

@Data
public class PaperPortfolioResponse {
    private String name;
    private double totalPortfolioValue;
    private double buyingPower;
    private double roi;
    private List<PortfolioAssetResponse> portfolioAssets;
    private List<TradeDto> trades;

    public PaperPortfolioResponse(String name, double totalPortfolioValue, double buyingPower, double roi, List<PortfolioAssetResponse> portfolioAssets, List<TradeDto> trades) {
        this.name = name;
        this.totalPortfolioValue = totalPortfolioValue;
        this.buyingPower = buyingPower;
        this.roi = roi;
        this.portfolioAssets = portfolioAssets;
        this.trades = trades;
    }
}
