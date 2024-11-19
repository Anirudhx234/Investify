package com.investify.backend.dtos;

import lombok.Data;

@Data
public class LeaderboardPositionDto {
    private BasicClientDto client;
    private double totalValue;

    public LeaderboardPositionDto(BasicClientDto client, double totalValue) {
        this.client = client;
        this.totalValue = totalValue;
    }
}
