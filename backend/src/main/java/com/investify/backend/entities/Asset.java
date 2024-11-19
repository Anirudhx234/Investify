package com.investify.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
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

    @OneToMany(mappedBy = "asset", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Trade> trades;

    public Asset(String symbol, String name) {
        this.symbol = symbol;
        this.name = name;
    }

    public abstract String getType();
}
