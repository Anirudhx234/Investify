package com.investify.backend;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Value("${polygon_api_key}")
    private String polygonApiKey;

    @PostConstruct
    public void initialize() {
        System.out.println(polygonApiKey);
    }
}
