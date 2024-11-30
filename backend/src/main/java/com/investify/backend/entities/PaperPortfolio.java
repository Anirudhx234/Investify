package com.investify.backend.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "paper_portfolio")
public class PaperPortfolio extends Portfolio {
    private double buyingPower;

    @OneToMany(mappedBy = "paperPortfolio", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Trade> trades;

    public PaperPortfolio(Client client, String name, double buyingPower) {
        super(client, name);
        this.buyingPower = buyingPower;
    }
}
