package com.investify.backend.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.investify.backend.enums.GameType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
public class Game {
    @Id
    @GeneratedValue
    private UUID id;

    private String name;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private double buyingPower;

    private GameType type;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<GamePortfolio> gamePortfolios;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Badge> badges;

    private boolean processed;

    public Game(String name, LocalDateTime startTime, LocalDateTime endTime, double buyingPower, GameType type) {
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
        this.buyingPower = buyingPower;
        this.type = type;
    }
}
