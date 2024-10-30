package com.investify.backend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "client", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username")
})
public class Client {

    @Id @GeneratedValue
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private UUID id;

    @Column(name = "username", nullable = false)
    @Size(max = 100)
    private String username;

    @Column(name = "email", nullable = false)
    @Size(max = 100)
    private String email;

    @Column(name = "password", nullable = false)
    @Size(max = 100)
    private String password;

    @Column(name = "verified", nullable = false)
    private boolean verified;

    @Column(name = "profile_picture", columnDefinition = "TEXT")
    private String profilePicture;

    @Column(name = "age")
    private Integer age;

    @Column(name = "income")
    private Double income;

    @Column(name = "financial_goals")
    private String financialGoals;

    @Column(name = "verification_token")
    private String verificationToken;

    @Column(name = "short_term_goal", columnDefinition = "TEXT")
    private String shortTermGoal;

    @Column(name = "long_term_goal", columnDefinition = "TEXT")
    private String longTermGoal;

    @Column(name = "investment_risk")
    private String investmentRisk;
}
