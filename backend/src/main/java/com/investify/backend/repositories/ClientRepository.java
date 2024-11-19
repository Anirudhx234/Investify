package com.investify.backend.repositories;

import com.investify.backend.dtos.ClientDto;
import com.investify.backend.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ClientRepository extends JpaRepository<Client, UUID> {
    Optional<Client> findById(UUID clientId);
    Optional<Client> findByEmail(String email);
    Optional<Client> findByVerificationToken(String verificationToken);
    Optional<Client> findByUsername(String username);
}