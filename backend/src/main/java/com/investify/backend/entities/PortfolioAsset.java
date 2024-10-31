package com.investify.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @ManyToOne
    @JsonIgnore
    private Portfolio portfolio;

    @ManyToOne
    private Asset asset;

    private double initialPrice;

    private double quantity;

    public PortfolioAsset(Portfolio portfolio, Asset asset, double initialPrice, double quantity) {
        this.portfolio = portfolio;
        this.asset = asset;

        if (initialPrice < 0) {
            throw new RestException("Initial price must be greater than 0", HttpStatus.BAD_REQUEST);
        }
        if (quantity < 0) {
            throw new RestException("Quantity must be greater than 0", HttpStatus.BAD_REQUEST);
        }
        this.initialPrice = initialPrice;
        this.quantity = quantity;
    }
}
