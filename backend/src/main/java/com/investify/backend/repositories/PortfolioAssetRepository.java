package com.investify.backend.repositories;

import com.investify.backend.entities.Asset;
import com.investify.backend.entities.Portfolio;
import com.investify.backend.entities.PortfolioAsset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

public interface PortfolioAssetRepository extends JpaRepository<PortfolioAsset, UUID> {
    Optional<PortfolioAsset> findByPortfolioAndAsset(Portfolio portfolio, Asset asset);
    Optional<PortfolioAsset> findByPortfolioAndAssetId(Portfolio portfolio, UUID assetId);

    Collection<PortfolioAsset> findByPortfolio(Portfolio portfolio);
}
