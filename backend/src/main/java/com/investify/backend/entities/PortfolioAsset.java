package com.investify.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.investify.backend.exceptions.RestException;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.http.HttpStatus;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioAsset {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Portfolio portfolio;

    @ManyToOne
    private Asset asset;

    private double averageCost;

    private double quantity;

    public PortfolioAsset(Portfolio portfolio, Asset asset) {
        this.portfolio = portfolio;
        this.asset = asset;
        this.averageCost = 0;
        this.quantity = 0;
    }

    public PortfolioAsset(Portfolio portfolio, Asset asset, double averageCost, double quantity) {
        this.portfolio = portfolio;
        this.asset = asset;

        if (averageCost < 0) {
            throw new RestException("Initial price must be greater than 0", HttpStatus.BAD_REQUEST);
        }
        if (quantity < 0) {
            throw new RestException("Quantity must be greater than 0", HttpStatus.BAD_REQUEST);
        }
        this.averageCost = averageCost;
        this.quantity = quantity;
    }
}
