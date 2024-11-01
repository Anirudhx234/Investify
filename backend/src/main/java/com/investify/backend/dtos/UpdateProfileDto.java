package com.investify.backend.dtos;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
import com.investify.backend.enums.InvestmentRisk;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateProfileDto {
    private String username;
    private String password;
    private MultipartFile profilePicture;
    private Integer age;
    private Double income;
    private String financialGoals;
    private String shortTermGoal;
    private String longTermGoal;
    private InvestmentRisk investmentRisk;
    private Integer userSavings;
    private Integer currentSavings;
}
