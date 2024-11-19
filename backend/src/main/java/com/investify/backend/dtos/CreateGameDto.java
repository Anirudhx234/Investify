package com.investify.backend.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateGameDto {
    private String name;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private double buyingPower;
}
