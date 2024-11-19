package com.investify.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@NoArgsConstructor
@Data
@Inheritance(strategy = InheritanceType.JOINED) // Subclasses will be mapped to their own tables
@Entity
@Table(name = "portfolio")
public abstract class Portfolio {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Client client;

    private String name;

    @OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<PortfolioAsset> portfolioAssets;

    public Portfolio(Client client, String name) {
        this.client = client;
        this.name = name;
    }
}
