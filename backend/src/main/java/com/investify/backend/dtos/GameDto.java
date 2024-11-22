package com.investify.backend.dtos;

import com.investify.backend.enums.GameType;
import lombok.Data;

import java.util.UUID;

@Data
public class GameDto {
    private UUID id;
    private String name;
    private String startTime;
    private String endTime;
    private double buyingPower;
    private GameType type;
}
