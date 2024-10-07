package com.investify.backend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "client")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable = false)
    @Size(max = 100)
    private String username;

    @Column(name = "email", nullable = false)
    @Size(max = 100)
    private String email;

    @Column(name = "password", nullable = false)
    @Size(max = 100)
    private String password;
}