package com.investify.backend.dtos;

import com.investify.backend.enums.TradeType;
import lombok.Data;

@Data
public class CreateTradeDto {
    private AssetDto asset;
    private TradeType type;
    private double quantity;
}
