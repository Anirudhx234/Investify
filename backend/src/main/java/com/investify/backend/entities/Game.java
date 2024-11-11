package com.investify.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "game")
public class Game {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, unique = true)
    private String gameCode;

    @Column(nullable = false, unique = true)
    private String invitationCode;

    @Column(nullable = false)
    private String creator;

    @Column(columnDefinition = "jsonb") // or just @Column if not JSON in PostgreSQL
    private String parameters;

    @OneToOne
    @JoinColumn(name = "client_id", nullable = false, unique = true)
    private Client client;

    public Game(String gameCode, String creator, String parameters, Client client) {
        this.gameCode = gameCode;
        this.invitationCode = UUID.randomUUID().toString().replace("-", "").substring(0, 8);
        this.creator = creator;
        this.parameters = parameters;
        this.client = client;
    }

    @ManyToMany
    @JoinTable(
            name = "game_participants",
            joinColumns = @JoinColumn(name = "game_id"),
            inverseJoinColumns = @JoinColumn(name = "client_id")
    )
    private List<Client> participants = new ArrayList<>();

    public void addParticipant(Client client) {
        this.participants.add(client);
    }
}
