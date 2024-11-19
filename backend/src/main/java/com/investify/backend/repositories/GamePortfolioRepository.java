package com.investify.backend.repositories;

import com.investify.backend.entities.Client;
import com.investify.backend.entities.GamePortfolio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface GamePortfolioRepository extends JpaRepository<GamePortfolio, UUID> {
    List<GamePortfolio> findByClientId(UUID clientId);
    Optional<GamePortfolio> findByClientAndGameId(Client client, UUID gameId);
}
