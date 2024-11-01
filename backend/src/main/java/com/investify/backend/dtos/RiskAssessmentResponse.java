package com.investify.backend.dtos;

import lombok.Data;

import java.util.List;

@Data
public class RiskAssessmentResponse {
    private double overallRiskScore;
    private List<AssetRiskDetail> assetsByRisk;

    public RiskAssessmentResponse(double overallRiskScore, List<AssetRiskDetail> assetsByRisk) {
        this.overallRiskScore = overallRiskScore;
        this.assetsByRisk = assetsByRisk;
    }

}
