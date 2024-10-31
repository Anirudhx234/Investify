package com.investify.backend.repositories;

import com.investify.backend.entities.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface AssetRepository extends JpaRepository<Asset, UUID> {
    Optional<Asset> findBySymbolAndName(String symbol, String name);
}
