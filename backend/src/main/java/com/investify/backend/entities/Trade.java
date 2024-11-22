package com.investify.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.investify.backend.enums.TradeType;
import com.investify.backend.utils.Utils;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
public class Trade {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private PaperPortfolio paperPortfolio;

    @ManyToOne(fetch = FetchType.EAGER)
    private Asset asset;

    private LocalDateTime time;

    @Enumerated(EnumType.STRING)
    private TradeType type;

    private double price;

    private double quantity;

    private double totalPortfolioValue;

    public Trade(PaperPortfolio paperPortfolio, Asset asset, TradeType type, double price, double quantity, double totalPortfolioValue) {
        this.paperPortfolio = paperPortfolio;
        this.asset = asset;
        this.time = Utils.currentUTCTime();
        this.type = type;
        this.price = price;
        this.quantity = quantity;
        this.totalPortfolioValue = totalPortfolioValue;
    }
}
