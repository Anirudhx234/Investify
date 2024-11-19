package com.investify.backend.dtos;

import lombok.Data;

import java.util.UUID;

@Data
public class GamePortfolioListDto {
    private UUID id;
    private String name;
    private GameDto game;
}
