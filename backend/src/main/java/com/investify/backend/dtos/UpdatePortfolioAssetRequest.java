package com.investify.backend.dtos;

import lombok.Data;

@Data
public class UpdatePortfolioAssetRequest {
    private double averageCost;
    private double quantity;
}