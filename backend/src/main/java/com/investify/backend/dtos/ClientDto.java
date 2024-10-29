package com.investify.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClientDto {
    private String id;
    private String email;
    private String username;
    private String profilePicture;
    private Integer age;
    private Double income;
    private String financialGoals;
}
