package com.investify.backend.dtos;

import com.investify.backend.enums.GameType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateGameDto {
    private String name;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private double buyingPower;
    private GameType type;
}
