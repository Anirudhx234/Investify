package com.investify.backend.entities;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class ETF extends Asset {
    public ETF(String symbol, String name) {
        super(symbol, name);
    }

    @Override
    public String getType() {
        return "ETFS";
    }
}
