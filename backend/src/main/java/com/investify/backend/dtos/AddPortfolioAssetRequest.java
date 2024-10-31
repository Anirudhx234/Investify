package com.investify.backend.dtos;

import lombok.Data;

@Data
public class AddPortfolioAssetRequest {
    private String symbol;
    private String name;
    private String assetType;
    private double initialPrice;
    private double quantity;
}
