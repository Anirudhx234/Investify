package com.investify.backend.dtos;

import com.investify.backend.entities.Asset;
import com.investify.backend.enums.TradeType;
import lombok.Data;

import java.util.UUID;

@Data
public class TradeDto {
    private UUID id;
    private Asset asset;
    private String time;
    private TradeType type;
    private double price;
    private double quantity;
    private double totalPortfolioValue;
}
