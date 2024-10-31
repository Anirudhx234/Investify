package com.investify.backend.dtos;

import com.investify.backend.entities.Asset;
import lombok.Data;

import java.util.UUID;

@Data
public class PortfolioAssetResponse {
    private UUID id;
    private Asset asset;
    private double quantity;
    private double price;
    private double totalAssetValue;

    public PortfolioAssetResponse(UUID id, Asset asset, double quantity, double price, double totalAssetValue) {
        this.id = id;
        this.asset = asset;
        this.quantity = quantity;
        this.price = price;
        this.totalAssetValue = totalAssetValue;
    }
}
