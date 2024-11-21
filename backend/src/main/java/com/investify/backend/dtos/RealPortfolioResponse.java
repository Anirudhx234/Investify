package com.investify.backend.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
public class RealPortfolioResponse extends PortfolioResponse {
    public RealPortfolioResponse(String name, double totalPortfolioValue, double roi, List<PortfolioAssetResponse> portfolioAssets) {
        super(name, totalPortfolioValue, roi, portfolioAssets);
    }
}
