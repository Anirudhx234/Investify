package com.investify.backend.entities;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Stock extends Asset {
    public Stock(String symbol, String name) {
        super(symbol, name);
    }

    @Override
    public String getType() {
        return "STOCKS";
    }
}
