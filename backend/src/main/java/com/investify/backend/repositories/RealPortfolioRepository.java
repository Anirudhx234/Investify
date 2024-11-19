package com.investify.backend.repositories;

import com.investify.backend.entities.RealPortfolio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RealPortfolioRepository extends JpaRepository<RealPortfolio, UUID> {

}
