package com.investify.backend.dtos;

import lombok.Data;

@Data
public class LeaderboardPositionDto {
    private int rank;
    private BasicClientDto client;
    private double totalValue;

    public LeaderboardPositionDto(BasicClientDto client, double totalValue) {
        this.client = client;
        this.totalValue = totalValue;
    }

    public LeaderboardPositionDto(int rank, BasicClientDto client, double totalValue) {
        this.rank = rank;
        this.client = client;
        this.totalValue = totalValue;
    }
}
