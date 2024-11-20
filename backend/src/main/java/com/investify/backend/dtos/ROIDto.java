package com.investify.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ROIDto {
    private double cost;
    private double gain;
    private double roi;
}
