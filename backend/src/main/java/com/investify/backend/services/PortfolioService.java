package com.investify.backend.services;

import com.investify.backend.dtos.AssetRiskDetail;
import com.investify.backend.dtos.PortfolioAssetResponse;
import com.investify.backend.dtos.PortfolioResponse;
import com.investify.backend.dtos.RiskAssessmentResponse;
import com.investify.backend.entities.*;
import com.investify.backend.exceptions.RestException;
import com.investify.backend.repositories.PortfolioRepository;
import com.investify.backend.repositories.PortfolioAssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PortfolioService {
    @Autowired
    private final PortfolioRepository portfolioRepository;

    @Autowired
    private final PortfolioAssetRepository portfolioAssetRepository;

    @Autowired
    private final ClientService clientService;

    @Autowired
    private final TwelveDataService twelveDataService;

    public PortfolioResponse getPortfolioAssets(Portfolio portfolio) {
        // Retrieve the portfolio assets
        List<PortfolioAssetResponse> portfolioAssets = portfolioAssetRepository.findByPortfolio(portfolio)
                .stream()
                .map(asset -> {
                    double currentPrice = twelveDataService.getLivePrice(asset.getAsset().getSymbol());
                    double totalAssetValue = asset.getQuantity() * currentPrice;
                    return new PortfolioAssetResponse(
                            asset.getId(),
                            asset.getAsset(),
                            asset.getQuantity(),
                            asset.getInitialPrice(),
                            currentPrice,
                            totalAssetValue
                    );
                })
                .collect(Collectors.toList());

        // Calculate total portfolio value
        double totalPortfolioValue = portfolioAssets.stream()
                .mapToDouble(PortfolioAssetResponse::getTotalAssetValue)
                .sum();

        return new PortfolioResponse(portfolioAssets, totalPortfolioValue);
    }

    public PortfolioAsset addAssetToPortfolio(Portfolio portfolio, Asset asset, double initialPrice, double quantity) {
        // Check if the asset already exists in the portfolio
        Optional<PortfolioAsset> existingAsset = portfolioAssetRepository.findByPortfolioAndAsset(portfolio, asset);
        if (existingAsset.isPresent()) {
            throw new RestException("Asset already exists in the portfolio", HttpStatus.CONFLICT);
        }

        PortfolioAsset portfolioAsset = new PortfolioAsset(portfolio, asset, initialPrice, quantity);
        portfolioAssetRepository.save(portfolioAsset);
        return portfolioAsset;
    }

    public PortfolioAsset updatePortfolioAsset(Portfolio portfolio, UUID assetId, double initialPrice, double quantity) {
        PortfolioAsset portfolioAsset = portfolioAssetRepository.findByPortfolioAndAssetId(portfolio, assetId)
                .orElseThrow(() -> new RestException("Asset not found in portfolio", HttpStatus.BAD_REQUEST));

        if (initialPrice < 0) {
            throw new RestException("Initial price must be greater than 0", HttpStatus.BAD_REQUEST);
        }
        if (quantity < 0) {
            throw new RestException("Quantity must be greater than 0", HttpStatus.BAD_REQUEST);
        }
        portfolioAsset.setInitialPrice(initialPrice);
        portfolioAsset.setQuantity(quantity);
        portfolioAssetRepository.save(portfolioAsset);
        return portfolioAsset;
    }

    public PortfolioAsset deletePortfolioAsset(Portfolio portfolio, UUID assetId) {
        PortfolioAsset portfolioAsset = portfolioAssetRepository.findByPortfolioAndAssetId(portfolio, assetId)
                .orElseThrow(() -> new RestException("Asset not found in portfolio", HttpStatus.BAD_REQUEST));

        portfolioAssetRepository.delete(portfolioAsset);
        return portfolioAsset;
    }

    private double getROI(PortfolioAsset portfolioAsset) {
        double initialPrice = portfolioAsset.getInitialPrice();  // Assume initial price is stored
        double currentPrice = twelveDataService.getLivePrice(portfolioAsset.getAsset().getSymbol());
        double quantity = portfolioAsset.getQuantity();

        double initialInvestment = initialPrice * quantity;
        double currentValue = currentPrice * quantity;

        return (currentValue - initialInvestment) / initialInvestment;
    }

    public RiskAssessmentResponse calculateRiskScoreWithAssets(String clientId, String riskPreference) {
        Portfolio portfolio = findPortfolio(clientId);

        // Risk multipliers for asset types
        double STOCK_MULTIPLIER = 3;
        double MUTUAL_FUND_MULTIPLIER = 2;
        double ETF_MULTIPLIER = 2;
        double CRYPTO_MULTIPLIER = 5;

        double overallRiskScore = 0;

        List<AssetRiskDetail> assetRiskDetails = new ArrayList<>();

        // Calculate total initial investment, current value, and individual asset risk contributions
        for (PortfolioAsset portfolioAsset : portfolioAssetRepository.findByPortfolio(portfolio)) {
            double returnPercentage = Math.abs(getROI(portfolioAsset));
            double assetRisk = 0;

            // Assign risk multiplier based on asset type and calculate weighted risk for each asset
            if (portfolioAsset.getAsset() instanceof Stock) {
                assetRisk = returnPercentage * STOCK_MULTIPLIER;
            } else if (portfolioAsset.getAsset() instanceof MutualFund) {
                assetRisk = returnPercentage * MUTUAL_FUND_MULTIPLIER;
            } else if (portfolioAsset.getAsset() instanceof ETF) {
                assetRisk = returnPercentage * ETF_MULTIPLIER;
            } else if (portfolioAsset.getAsset() instanceof Cryptocurrency) {
                assetRisk = returnPercentage * CRYPTO_MULTIPLIER;
            }

            // Accumulate total risk score
            overallRiskScore += assetRisk;

            // Add each asset's details to the list
            assetRiskDetails.add(new AssetRiskDetail(
                    portfolioAsset,
                    assetRisk
            ));
        }

        // Adjust overall risk score based on user preference
        switch (riskPreference.toLowerCase()) {
            case "low":
                overallRiskScore /= 1;
                break;
            case "medium":
                overallRiskScore /= 1.1;
                break;
            case "high":
                overallRiskScore /= 1.3;
                break;
            default:
                throw new IllegalArgumentException("Invalid risk preference");
        }

        // Normalize overall risk score to be between 0 and 1
        overallRiskScore = Math.min(Math.max(overallRiskScore, 0), 1);

        // Sort assets by their individual risk scores in descending order
        assetRiskDetails.sort((a, b) -> Double.compare(b.getRiskScore(), a.getRiskScore()));

        // Create and return response
        return new RiskAssessmentResponse(overallRiskScore, assetRiskDetails);
    }

    public Portfolio findPortfolio(String clientId) {
        Client client = clientService.findById(clientId);
        return portfolioRepository.findByClientId(client.getId())
                .orElseThrow(() -> new RuntimeException("Portfolio not found for client"));
    }

    public Portfolio findOrCreatePortfolio(String clientId) {
        Client client = clientService.findById(clientId);
        return portfolioRepository.findByClientId(client.getId())
                .orElseGet(() -> createPortfolioForClient(client));
    }

    // Helper method to create a portfolio for the client
    private Portfolio createPortfolioForClient(Client client) {
        return portfolioRepository.save(new Portfolio(client));
    }

    public Map<String, Double> calculateSectorValuations(String clientId) {
        Portfolio portfolio = findOrCreatePortfolio(clientId);

        // Retrieve PortfolioAssets and collect as a List
        List<PortfolioAsset> assets = portfolioAssetRepository.findByPortfolio(portfolio)
                .stream()
                .toList();

        // Group by asset type and calculate valuations based on live price and quantity
        return assets.stream()
                .collect(Collectors.groupingBy(
                        asset -> asset.getAsset().getType(),
                        Collectors.summingDouble(asset -> {
                            double livePrice = twelveDataService.getLivePrice(asset.getAsset().getSymbol());
                            return livePrice * asset.getQuantity();
                        })
                ));
    }

    public double getTotalPortfolioValue(String clientId) {
        // Find or create portfolio for the client
        Portfolio portfolio = findOrCreatePortfolio(clientId);

        // Retrieve portfolio assets and calculate total value
        return portfolioAssetRepository.findByPortfolio(portfolio)
                .stream()
                .mapToDouble(asset -> {
                    double currentPrice = twelveDataService.getLivePrice(asset.getAsset().getSymbol());
                    return asset.getQuantity() * currentPrice;
                })
                .sum();
    }

    public double getReturnOnInvestment(String clientId) {
        // Find or create portfolio for the client
        Portfolio portfolio = findOrCreatePortfolio(clientId);

        // Retrieve portfolio assets and calculate total current value and initial investment
        double totalCurrentValue = 0;
        double initialInvestmentValue = 0;

        for (PortfolioAsset asset : portfolioAssetRepository.findByPortfolio(portfolio)) {
            double currentPrice = twelveDataService.getLivePrice(asset.getAsset().getSymbol());
            totalCurrentValue += asset.getQuantity() * currentPrice;
            initialInvestmentValue += asset.getQuantity() * asset.getInitialPrice();
        }

        // Calculate and return ROI
        return totalCurrentValue - initialInvestmentValue;
    }


}