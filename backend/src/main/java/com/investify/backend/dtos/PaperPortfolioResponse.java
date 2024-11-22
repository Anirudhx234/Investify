package com.investify.backend.dtos;

import lombok.Data;

import java.util.List;

@Data
public class PaperPortfolioResponse extends PortfolioResponse {
    private double buyingPower;
    private List<TradeDto> trades;

    public PaperPortfolioResponse(String name, double totalPortfolioValue, double buyingPower, double roi, List<PortfolioAssetResponse> portfolioAssets, List<TradeDto> trades) {
        super(name, totalPortfolioValue, roi, portfolioAssets);
        this.buyingPower = buyingPower;
        this.trades = trades;
    }

    public PaperPortfolioResponse(String name, double totalPortfolioValue, double buyingPower, double roi, List<TradeDto> trades) {
        super(name, totalPortfolioValue, roi);
        this.buyingPower = buyingPower;
        this.trades = trades;
    }
}
