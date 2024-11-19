package com.investify.backend.dtos;

import lombok.Data;

import java.util.UUID;

@Data
public class CreatePaperPortfolioDto {
    private String name;
    private double buyingPower;
}
