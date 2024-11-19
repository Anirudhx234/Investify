package com.investify.backend.services;

import com.investify.backend.dtos.AssetDto;
import com.investify.backend.entities.*;
import com.investify.backend.enums.AssetType;
import com.investify.backend.repositories.AssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AssetService {

    private final AssetRepository assetRepository;

    public Asset findOrCreateAsset(AssetDto asset) {
        String symbol = asset.getSymbol();
        String name = asset.getName();
        // Find or create the asset based on symbol and name
        return assetRepository.findBySymbolAndName(symbol, name)
                .orElseGet(() -> createAsset(symbol, name, asset.getAssetType()));
    }

    // Helper method to create an asset of the correct type
    private Asset createAsset(String symbol, String name, AssetType assetType) {
        return switch (assetType) {
            case STOCKS -> assetRepository.save(
                    new Stock(symbol, name));
            case MUTUAL_FUNDS -> assetRepository.save(
                    new MutualFund(symbol, name));
            case ETFS -> assetRepository.save(
                    new ETF(symbol, name));
            case CRYPTO -> assetRepository.save(
                    new Cryptocurrency(symbol, name));
            default -> throw new IllegalArgumentException("Invalid asset type");
        };
    }
}
