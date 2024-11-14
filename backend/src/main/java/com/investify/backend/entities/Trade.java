package com.investify.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.investify.backend.enums.InvestmentRisk;
import com.investify.backend.enums.TradeType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.sql.Timestamp;
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

    @Column(name = "time")
    private Timestamp time;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private TradeType type;

    @Column(name = "price")
    private double price;

    @Column(name = "quantity")
    private double quantity;

    public Trade(PaperPortfolio paperPortfolio, Asset asset, TradeType type, double price, double quantity) {
        this.paperPortfolio = paperPortfolio;
        this.asset = asset;
        this.time = new Timestamp(System.currentTimeMillis());
        this.type = type;
        this.price = price;
        this.quantity = quantity;
    }
}
