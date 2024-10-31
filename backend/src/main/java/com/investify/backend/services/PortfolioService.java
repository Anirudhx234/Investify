package com.investify.backend.services;

import com.investify.backend.dtos.PortfolioAssetResponse;
import com.investify.backend.dtos.PortfolioResponse;
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

    public PortfolioResponse getPortfolioAssets(String clientId) {
        Portfolio portfolio = findPortfolio(clientId);

        // Retrieve the portfolio assets
        List<PortfolioAssetResponse> portfolioAssets = portfolioAssetRepository.findByPortfolio(portfolio)
                .stream()
                .map(asset -> {
                    double price = twelveDataService.getLivePrice(asset.getAsset().getSymbol());
                    double totalAssetValue = asset.getQuantity() * price;
                    return new PortfolioAssetResponse(
                            asset.getId(),
                            asset.getAsset(),
                            asset.getQuantity(),
                            price,
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

    public PortfolioAsset addAssetToPortfolio(Portfolio portfolio, Asset asset, double quantity) {
        // Check if the asset already exists in the portfolio
        Optional<PortfolioAsset> existingAsset = portfolioAssetRepository.findByPortfolioAndAsset(portfolio, asset);
        if (existingAsset.isPresent()) {
            throw new RestException("Asset already exists in the portfolio", HttpStatus.CONFLICT);
        }

        PortfolioAsset portfolioAsset = new PortfolioAsset(portfolio, asset, quantity);
        portfolioAssetRepository.save(portfolioAsset);
        return portfolioAsset;
    }

    public PortfolioAsset updatePortfolioAsset(Portfolio portfolio, UUID assetId, double quantity) {
        PortfolioAsset portfolioAsset = portfolioAssetRepository.findByPortfolioAndAssetId(portfolio, assetId)
                .orElseThrow(() -> new RuntimeException("Asset not found in portfolio"));

        portfolioAsset.setQuantity(quantity);
        portfolioAssetRepository.save(portfolioAsset);
        return portfolioAsset;
    }

    public PortfolioAsset deletePortfolioAsset(Portfolio portfolio, UUID assetId) {
        PortfolioAsset portfolioAsset = portfolioAssetRepository.findByPortfolioAndAssetId(portfolio, assetId)
                .orElseThrow(() -> new RuntimeException("Asset not found in portfolio"));

        portfolioAssetRepository.delete(portfolioAsset);
        return portfolioAsset;
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
}