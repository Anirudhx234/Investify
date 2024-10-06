package com.investify.backend.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.reactive.server.WebTestClient;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureWebTestClient
public class PolygonControllerTest {

    @Autowired
    private WebTestClient webTestClient;

    @Test
    public void testGetStockData() {
        webTestClient.get().uri("/api/v1/polygon/stock/AAPL")
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$.ticker").isEqualTo("AAPL");
    }
}