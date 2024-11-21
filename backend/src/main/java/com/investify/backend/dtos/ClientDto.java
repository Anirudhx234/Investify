package com.investify.backend.dtos;
import com.investify.backend.entities.Badge;
import com.investify.backend.entities.Client;
import com.investify.backend.enums.InvestmentRisk;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

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
    private String shortTermGoal;
    private String longTermGoal;
    private InvestmentRisk investmentRisk;
    private Integer userSavings;
    private Integer currentSavings;
    private List<Badge> badges;
    private List<Client> friends;
}
