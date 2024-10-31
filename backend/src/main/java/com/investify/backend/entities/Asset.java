package com.investify.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED) // Subclasses will be mapped to their own tables
@Entity
public abstract class Asset {
    @Id
    @GeneratedValue
    private UUID id;

    private String symbol;
    private String name;

    public Asset(String symbol, String name) {
        this.symbol = symbol;
        this.name = name;
    }

    public abstract String getType();
}
