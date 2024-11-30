package com.investify.backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Entity
@Table(name = "real_portfolio")
public class RealPortfolio extends Portfolio {

    public RealPortfolio(Client client, String name) {
        super(client, name);
    }
}