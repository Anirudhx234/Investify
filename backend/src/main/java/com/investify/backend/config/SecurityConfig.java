package com.investify.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final ClientAuthenticationEntryPoint clientAuthenticationEntryPoint;
    private final ClientAuthenticationProvider clientAuthenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .exceptionHandling().authenticationEntryPoint(clientAuthenticationEntryPoint)
                .and()
                .addFilterBefore(new JwtAuthFilter(clientAuthenticationProvider), BasicAuthenticationFilter.class)
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeHttpRequests((requests) -> requests
                        // Allow access to signup, login, and verification without authentication
                        .requestMatchers(HttpMethod.POST, "/api/auth/login", "/api/auth/signup", "/api/auth/forgot-password").permitAll()
                        .requestMatchers(HttpMethod.PATCH, "/api/auth/reset-password").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/auth/verify-email", "/api/assets/**").permitAll()
                        // Allow unauthenticated access to WebSocket endpoint
                        .requestMatchers("/prices/**").permitAll()
                        .anyRequest().authenticated())
        ;
        return http.build();
    }
}
