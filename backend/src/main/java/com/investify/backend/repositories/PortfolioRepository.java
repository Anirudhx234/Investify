package com.investify.backend.repositories;

import com.investify.backend.entities.Asset;
import com.investify.backend.entities.Portfolio;
import com.investify.backend.entities.PortfolioAsset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PortfolioRepository extends JpaRepository<Portfolio, UUID> {
    Optional<List<Portfolio>> findByClientId(UUID clientId);
}
