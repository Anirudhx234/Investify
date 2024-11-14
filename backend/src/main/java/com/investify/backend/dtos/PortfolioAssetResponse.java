package com.investify.backend.dtos;

import com.investify.backend.entities.Asset;
import lombok.Data;

import java.util.UUID;

@Data
public class PortfolioAssetResponse {
    private UUID id;
    private Asset asset;
    private double quantity;
    private double averageCost;
    private double currentPrice;
    private double totalAssetValue;

    public PortfolioAssetResponse(UUID id, Asset asset, double quantity, double averageCost, double currentPrice, double totalAssetValue) {
        this.id = id;
        this.asset = asset;
        this.quantity = quantity;
        this.averageCost = averageCost;
        this.currentPrice = currentPrice;
        this.totalAssetValue = totalAssetValue;
    }
}
