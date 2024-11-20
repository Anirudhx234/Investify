package com.investify.backend.dtos;

import lombok.Data;

import java.util.UUID;

@Data
public class BadgeDto {
    private UUID id;
    private String type;
    private GameDto game;
}
