package com.investify.backend.dtos;

import com.investify.backend.enums.AssetType;
import lombok.Data;

@Data
public class AddPortfolioAssetRequest {
    private AssetDto asset;
    private double averageCost;
    private double quantity;
}
