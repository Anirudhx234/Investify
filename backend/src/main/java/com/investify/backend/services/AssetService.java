package com.investify.backend.services;

import com.investify.backend.entities.*;
import com.investify.backend.repositories.AssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AssetService {

    private final AssetRepository assetRepository;

    public Asset findOrCreateAsset(String symbol, String name, String assetType) {
        // Find or create the asset based on symbol and name
        return assetRepository.findBySymbolAndName(symbol, name)
                .orElseGet(() -> createAsset(symbol, name, assetType));
    }

    // Helper method to create an asset of the correct type
    private Asset createAsset(String symbol, String name, String assetType) {
        return switch (assetType.toLowerCase()) {
            case "stocks" -> assetRepository.save(
                    new Stock(symbol, name));
            case "mutual-funds" -> assetRepository.save(
                    new MutualFund(symbol, name));
            case "etfs" -> assetRepository.save(
                    new ETF(symbol, name));
            case "crypto" -> assetRepository.save(
                    new Cryptocurrency(symbol, name));
            default -> throw new IllegalArgumentException("Invalid asset type");
        };
    }
}
