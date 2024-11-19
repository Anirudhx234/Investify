package com.investify.backend.repositories;

import com.investify.backend.entities.Badge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BadgeRepository extends JpaRepository<Badge, UUID> {

}