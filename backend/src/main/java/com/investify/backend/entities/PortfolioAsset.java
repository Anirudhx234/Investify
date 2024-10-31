package com.investify.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonAppend;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioAsset {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JsonIgnore
    private Portfolio portfolio;

    @ManyToOne
    private Asset asset;

    private double quantity;

    public PortfolioAsset(Portfolio portfolio, Asset asset, double quantity) {
        this.portfolio = portfolio;
        this.asset = asset;
        this.quantity = quantity;
    }
}
