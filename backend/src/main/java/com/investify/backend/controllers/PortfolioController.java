package com.investify.backend.controllers;

import com.investify.backend.dtos.*;
import com.investify.backend.entities.*;
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
    private final PortfolioService portfolioService;

    @PostMapping("/clients/{clientId}/real")
    public ResponseEntity<RealPortfolio> createRealPortfolio(@PathVariable String clientId, @RequestBody CreateRealPortfolioDto request) {

        RealPortfolio portfolio = portfolioService.createRealPortfolio(clientId, request);

        return ResponseEntity.ok(portfolio);
    }

    @PostMapping("/clients/{clientId}/paper")
    public ResponseEntity<PaperPortfolio> createPaperPortfolio(@PathVariable String clientId, @RequestBody CreatePaperPortfolioDto request) {

        PaperPortfolio portfolio = portfolioService.createPaperPortfolio(clientId, request);

        return ResponseEntity.ok(portfolio);
    }

    @GetMapping("/clients/{clientId}")
    public ResponseEntity getAllPortfolios(@PathVariable String clientId) {

        return ResponseEntity.ok(portfolioService.getAllPortfolios(clientId));
    }

    @GetMapping("/{portfolioId}")
    public ResponseEntity<Object> getPortfolio(@PathVariable UUID portfolioId) {

        Object portfolio = portfolioService.getPortfolio(portfolioId);

        return ResponseEntity.ok(portfolio);
    }

    @PatchMapping("/{portfolioId}")
    public ResponseEntity<Portfolio> updatePortfolio(@PathVariable UUID portfolioId, @RequestBody UpdatePortfolioDto request) {

        Portfolio portfolio = portfolioService.updatePortfolio(portfolioId, request);

        return ResponseEntity.ok(portfolio);
    }

    @DeleteMapping("/{portfolioId}")
    public ResponseEntity<MessageDto> deletePortfolio(@PathVariable UUID portfolioId) {

        portfolioService.deletePortfolio(portfolioId);

        return ResponseEntity.ok(new MessageDto("Portfolio deleted"));
    }

    @PostMapping("/{realPortfolioId}/assets")
    public ResponseEntity addPortfolioAsset(
            @PathVariable UUID realPortfolioId,
            @RequestBody AddPortfolioAssetRequest request) {

        PortfolioAsset portfolioAsset = portfolioService.addAssetToPortfolio(realPortfolioId, request);

        return ResponseEntity.ok(portfolioAsset);
    }

    @PatchMapping("/{realPortfolioId}/assets/{assetId}")
    public ResponseEntity updatePortfolioAsset(
            @PathVariable UUID realPortfolioId,
            @PathVariable UUID assetId,
            @RequestBody UpdatePortfolioAssetRequest request) {

        PortfolioAsset portfolioAsset = portfolioService.updatePortfolioAsset(realPortfolioId, assetId, request.getAverageCost(), request.getQuantity());

        return ResponseEntity.ok(portfolioAsset);
    }

    @DeleteMapping("/{realPortfolioId}/assets/{assetId}")
    public ResponseEntity deletePortfolioAsset(
            @PathVariable UUID realPortfolioId,
            @PathVariable UUID assetId) {

        PortfolioAsset portfolioAsset = portfolioService.deletePortfolioAsset(realPortfolioId, assetId);

        return ResponseEntity.ok(portfolioAsset);
    }

    @GetMapping("/{portfolioId}/risk-assessment")
    public ResponseEntity<RiskAssessmentResponse> getRiskAssessment(
            @PathVariable UUID portfolioId) {

        RiskAssessmentResponse response = portfolioService.calculateRiskScoreWithAssets(portfolioId);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{portfolioId}/risk-chart")
    public ResponseEntity<List<Map<String, Object>>> getAverageROIAndRiskByAssetType(
            @PathVariable UUID portfolioId) {

        List<Map<String, Object>> roiRiskByType = portfolioService.calculateAverageROIAndRiskByAssetType(portfolioId);

        return ResponseEntity.ok(roiRiskByType);
    }

    @GetMapping("/{portfolioId}/sector-valuations")
    public ResponseEntity<Map<String, Double>> getSectorValuations(
            @PathVariable UUID portfolioId) {

        Map<String, Double> sectorValuations = portfolioService.calculateSectorValuations(portfolioId);
        return ResponseEntity.ok(sectorValuations);
    }

    /*
    @GetMapping("/{portfolioId}/roi")
    public ResponseEntity<Double> getPortfolioROI(@PathVariable UUID portfolioId) {
        double roi = portfolioService.getPortfolioROI(portfolioId);
        return ResponseEntity.ok(roi);
    }*/

    @GetMapping("/{paperPortfolioId}/trades")
    public ResponseEntity getTrades(@PathVariable UUID paperPortfolioId) {
        List<TradeDto> trades = portfolioService.getTrades(paperPortfolioId);
        return ResponseEntity.ok(trades);
    }

    @PostMapping("/{paperPortfolioId}/trades")
    public ResponseEntity createTrade(@PathVariable UUID paperPortfolioId, @RequestBody CreateTradeDto request) {
        TradeDto trade = portfolioService.createTrade(paperPortfolioId, request);
        return ResponseEntity.ok(trade);
    }
}