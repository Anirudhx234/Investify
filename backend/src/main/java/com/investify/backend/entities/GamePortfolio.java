package com.investify.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class GamePortfolio extends PaperPortfolio {

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Game game;

    public GamePortfolio(Client client, Game game) {
        super(client, game.getName(), game.getBuyingPower());
        this.game = game;
    }
}
