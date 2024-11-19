package com.investify.backend.entities;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Entity
public class RankBadge extends Badge {
    private int rank;

    public RankBadge(int rank, Game game, Client client) {
        super("rank", game, client);
        this.rank = rank;
    }
}
