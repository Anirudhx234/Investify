package com.investify.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateProfileDto {
    private String username;
    private String password;
    private MultipartFile profilePicture;
    private int age;
    private Double income;
    private String financialGoals;
}
