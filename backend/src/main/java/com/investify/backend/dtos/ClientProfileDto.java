package com.investify.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClientProfileDto {
    private String email;
    private String username;
    private String profilePicture;
    private int age;
    private String financialGoals;
}
