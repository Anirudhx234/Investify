package com.investify.backend.controllers;

import com.investify.backend.dtos.AddPortfolioAssetRequest;
import com.investify.backend.dtos.PortfolioResponse;
import com.investify.backend.dtos.UpdatePortfolioAssetRequest;
import com.investify.backend.entities.*;
import com.investify.backend.services.AssetService;
import com.investify.backend.services.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/portfolios")
public class PortfolioController {
    private final AssetService assetService;
    private final PortfolioService portfolioService;


    @GetMapping("/{clientId}")
    public ResponseEntity<PortfolioResponse> getPortfolioAssets(
            @PathVariable String clientId) {

        PortfolioResponse portfolioAssets = portfolioService.getPortfolioAssets(clientId);

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

}
