package com.investify.backend.dtos;

import lombok.Data;

@Data
public class PortfolioAssetRequest {
    private String symbol;
    private String name;
    private String assetType;
    private double quantity;
}
