package com.investify.backend.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
@Service
@PropertySource("classpath:application-APIs.properties")
public class CoinMarketService {
    @Value("${coinMarket.api.key}")
    private String coinMarketApiKey;

    private final WebClient webClient;

    @Autowired
    public CoinMarketService(WebClient.Builder coinMarketWebClientBuilder) {
        this.webClient = coinMarketWebClientBuilder
                .baseUrl("https://pro-api.coinmarketcap.com")
                .defaultHeader("Accept", "application/json")
                .build();
    }

    public Mono<String> getPopularCrypto() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1/cryptocurrency/listings/latest")
                        .queryParam("limit", 50)
                        .queryParam("convert", "USD")
                        .queryParam("CMC_PRO_API_KEY", coinMarketApiKey)
                        .build())
                .retrieve()
                .bodyToMono(String.class);
    }
}