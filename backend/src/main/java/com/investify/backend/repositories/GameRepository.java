package com.investify.backend.repositories;

import com.investify.backend.entities.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GameRepository extends JpaRepository<Game, UUID> {

}
