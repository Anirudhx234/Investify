package com.investify.backend.dtos;

import com.investify.backend.entities.Trade;
import lombok.Data;

import java.util.List;

@Data
public class PaperPortfolioResponse {
    private List<PortfolioAssetResponse> portfolioAssets;
    private List<Trade> trades;
    private double totalPortfolioValue;
    private double buyingPower;

    public PaperPortfolioResponse(List<PortfolioAssetResponse> portfolioAssets, List<Trade> trades, double totalPortfolioValue, double buyingPower) {
        this.portfolioAssets = portfolioAssets;
        this.trades = trades;
        this.totalPortfolioValue = totalPortfolioValue;
        this.buyingPower = buyingPower;
    }
}
