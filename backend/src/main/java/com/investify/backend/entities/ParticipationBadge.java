package com.investify.backend.entities;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Entity
public class ParticipationBadge extends Badge {

    public ParticipationBadge(Game game) {
        super("participation", game);
    }
}
