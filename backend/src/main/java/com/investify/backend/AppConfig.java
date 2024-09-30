package com.investify.backend;

import com.investify.backend.services.AlphaVantageService;
import com.investify.backend.services.PolygonService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Autowired
    private PolygonService polygonService;

    @PostConstruct
    public void initialize() {
        // For temporary testing of the polygonService
        String stockData = polygonService.getStockData("AAPL").block();
        System.out.println(stockData);
    }
}
