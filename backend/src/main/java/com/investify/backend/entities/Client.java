package com.investify.backend.entities;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.investify.backend.enums.InvestmentRisk;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.ArrayList;
import java.util.List;
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

    @Column(name = "profile_picture")
    private String profilePicture;

    @Column(name = "age")
    private Integer age;

    @Column(name = "income")
    private Double income;

    @Column(name = "financial_goals", columnDefinition = "TEXT")
    private String financialGoals;

    @Column(name = "verification_token")
    private String verificationToken;

    @Column(name = "short_term_goal", columnDefinition = "TEXT")
    private String shortTermGoal;

    @Column(name = "long_term_goal", columnDefinition = "TEXT")
    private String longTermGoal;

    @Enumerated(EnumType.STRING)
    @Column(name = "investment_risk")
    private InvestmentRisk investmentRisk;

    @Column(name = "userSavings")
    private Integer userSavings;

    @Column(name = "currentSavings")
    private Integer currentSavings;

    @Column(name = "financialAdvice", columnDefinition = "TEXT")
    private String financialAdvice;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Portfolio> realPortfolios;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<PaperPortfolio> paperPortfolios;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<GamePortfolio> gamePortfolios;

    @ManyToMany
    private List<Badge> badges;

    @ManyToMany
    private List<Client> friends;

    @ManyToMany
    private List<Client> friendRequests;
}
