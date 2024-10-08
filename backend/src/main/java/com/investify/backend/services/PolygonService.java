package com.investify.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@PropertySource("classpath:application-APIs.properties")
public class PolygonService {

    @Value("${polygon.api.key}")
    private String polygonApiKey;

    private final WebClient webClient;

    @Autowired
    public PolygonService(WebClient.Builder polygonWebClientBuilder) {
        this.webClient = polygonWebClientBuilder.baseUrl("https://api.polygon.io").build();
    }

    // Example GET request:
    // https://api.polygon.io/v2/aggs/ticker/AAPL/prev&apiKey=

    public Mono<String> getStockData(String ticker) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/v2/aggs/ticker/{ticker}/prev")
                        .queryParam("apiKey", polygonApiKey)
                        .build(ticker))
                .retrieve()
                .bodyToMono(String.class);
    }
}