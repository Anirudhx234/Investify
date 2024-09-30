package com.investify.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@PropertySource("classpath:application-APIs.properties")
public class AlphaVantageService {

    @Value("${alphaVantage.api.key}")
    private String alphaVantageApiKey;

    private final WebClient webClient;

    @Autowired
    public AlphaVantageService(WebClient.Builder alphaVantageWebClientBuilder) {
        this.webClient = alphaVantageWebClientBuilder.baseUrl("https://www.alphavantage.co").build();
    }

    // Example GET request:
    // https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=

    public Mono<String> getPopularStocks() {
        System.out.println(alphaVantageApiKey);
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/query")
                        .queryParam("function", "TOP_GAINERS_LOSERS")
                        .queryParam("apikey", alphaVantageApiKey)
                        .build())
                .retrieve()
                .bodyToMono(String.class);
    }
}