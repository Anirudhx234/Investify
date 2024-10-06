package com.investify.backend.services;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class PolygonServiceTest {

    @Autowired
    private PolygonService polygonService;

    @MockBean
    private WebClient webClient; // Mock WebClient

    @Test
    public void testGetStockData() {
        // Mock response and behavior of WebClient

        // Call the service method
        Mono<String> stockData = polygonService.getStockData("AAPL");

        // Assertions
        assertNotNull(stockData);
    }
}