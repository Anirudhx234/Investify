package com.investify.backend.dtos;

import lombok.Data;

@Data
public class UpdatePortfolioAssetRequest {
    private double initialPrice;
    private double quantity;
}