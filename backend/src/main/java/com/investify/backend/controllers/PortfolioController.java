package com.investify.backend.controllers;

import com.investify.backend.dtos.AddPortfolioAssetRequest;
import com.investify.backend.dtos.PortfolioResponse;
import com.investify.backend.dtos.RiskAssessmentResponse;
import com.investify.backend.dtos.UpdatePortfolioAssetRequest;
import com.investify.backend.entities.*;
import com.investify.backend.services.AssetService;
import com.investify.backend.services.ClientService;
import com.investify.backend.services.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/portfolios")
public class PortfolioController {
    private final AssetService assetService;
    private final PortfolioService portfolioService;
    private final ClientService clientService;


    @GetMapping("/{clientId}")
    public ResponseEntity<PortfolioResponse> getPortfolioAssets(
            @PathVariable String clientId) {

        Portfolio portfolio = portfolioService.findOrCreatePortfolio(clientId);

        PortfolioResponse portfolioAssets = portfolioService.getPortfolioAssets(portfolio);

        return ResponseEntity.ok(portfolioAssets);
    }

    // Add a Portfolio Asset to a Client's Portfolio
    @PostMapping("/{clientId}/assets")
    public ResponseEntity addPortfolioAsset(
            @PathVariable String clientId,
            @RequestBody AddPortfolioAssetRequest request) {

        Asset asset = assetService.findOrCreateAsset(request.getSymbol(), request.getName(), request.getAssetType());

        Portfolio portfolio = portfolioService.findOrCreatePortfolio(clientId);

        PortfolioAsset portfolioAsset = portfolioService.addAssetToPortfolio(portfolio, asset, request.getInitialPrice(), request.getQuantity());

        return ResponseEntity.ok(portfolioAsset);
    }

    // Update a Portfolio Asset for a Client
    @PatchMapping("/{clientId}/assets/{assetId}")
    public ResponseEntity updatePortfolioAsset(
            @PathVariable String clientId,
            @PathVariable UUID assetId,
            @RequestBody UpdatePortfolioAssetRequest request) {

        Portfolio portfolio = portfolioService.findPortfolio(clientId);

        PortfolioAsset portfolioAsset = portfolioService.updatePortfolioAsset(portfolio, assetId, request.getInitialPrice(), request.getQuantity());

        return ResponseEntity.ok(portfolioAsset);
    }

    // Delete a Portfolio Asset for a Client
    @DeleteMapping("/{clientId}/assets/{assetId}")
    public ResponseEntity deletePortfolioAsset(
            @PathVariable String clientId,
            @PathVariable UUID assetId) {

        Portfolio portfolio = portfolioService.findPortfolio(clientId);

        PortfolioAsset portfolioAsset = portfolioService.deletePortfolioAsset(portfolio, assetId);

        return ResponseEntity.ok(portfolioAsset);
    }

    @GetMapping("/{clientId}/risk-assessment")
    public ResponseEntity<RiskAssessmentResponse> getRiskAssessment(
            @PathVariable String clientId) {

        Client client = clientService.findById(clientId);
        Portfolio portfolio = portfolioService.findPortfolio(clientId);
        RiskAssessmentResponse response = portfolioService.calculateRiskScoreWithAssets(portfolio, client.getInvestmentRisk().toString()
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{clientId}/risk-chart")
    public ResponseEntity<List<Map<String, Object>>> getAverageROIAndRiskByAssetType(
            @PathVariable String clientId) {

        Client client = clientService.findById(clientId);
        Portfolio portfolio = portfolioService.findPortfolio(clientId);
        List<Map<String, Object>> roiRiskByType = portfolioService.calculateAverageROIAndRiskByAssetType(portfolio, client.getInvestmentRisk().toString());

        return ResponseEntity.ok(roiRiskByType);
    }

    @GetMapping("/{clientId}/sector-valuations")
    public ResponseEntity<Map<String, Double>> getSectorValuations(
            @PathVariable String clientId) {

        Map<String, Double> sectorValuations = portfolioService.calculateSectorValuations(clientId);
        return ResponseEntity.ok(sectorValuations);
    }
    
    @GetMapping("/{clientId}/total-portfolio-value")
    public ResponseEntity<Double> getTotalPortfolioValue(@PathVariable String clientId) {
        double totalValue = portfolioService.getTotalPortfolioValue(clientId);
        return ResponseEntity.ok(totalValue);
    }

    @GetMapping("/{clientId}/roi")
    public ResponseEntity<Double> getReturnOnInvestment(@PathVariable String clientId) {
        double roi = portfolioService.getReturnOnInvestment(clientId);
        return ResponseEntity.ok(roi);
    }
}