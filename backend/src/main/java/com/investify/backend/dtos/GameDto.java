package com.investify.backend.dtos;

import lombok.Data;

import java.util.UUID;

@Data
public class GameDto {
    private UUID id;
    private String name;
    private String startTime;
    private String endTime;
    private double buyingPower;
    private String mode;
}
