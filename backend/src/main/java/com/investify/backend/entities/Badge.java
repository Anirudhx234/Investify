package com.investify.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@NoArgsConstructor
@Data
@Entity
public abstract class Badge {
    @Id
    @GeneratedValue
    private UUID id;

    private String type;

    @ManyToOne
    @JsonBackReference
    private Game game;

    @ManyToMany
    @JsonIgnore
    private List<Client> clients = new ArrayList<>();

    public Badge(String type, Game game) {
        this.type = type;
        this.game = game;
    }

    public Badge(String type, Game game, Client client) {
        this.type = type;
        this.game = game;
        this.clients.add(client);
    }
}
