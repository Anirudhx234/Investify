package com.investify.backend.repositories;

import com.investify.backend.entities.PaperPortfolio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PaperPortfolioRepository extends JpaRepository<PaperPortfolio, UUID> {

}