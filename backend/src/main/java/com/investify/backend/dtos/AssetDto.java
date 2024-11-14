package com.investify.backend.dtos;

import com.investify.backend.enums.AssetType;
import lombok.Data;

@Data
public class AssetDto {
    private String symbol;
    private String name;
    private AssetType assetType;
}
