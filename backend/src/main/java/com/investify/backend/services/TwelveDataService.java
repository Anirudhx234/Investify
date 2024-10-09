package com.investify.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@PropertySource("classpath:application-APIs.properties")
public class TwelveDataService {

    @Value("${twelveData.api.key}")
    private String twelveDataApiKey;

    private final WebClient webClient;

    @Autowired
    public TwelveDataService(WebClient.Builder polygonWebClientBuilder) {
        this.webClient = polygonWebClientBuilder.baseUrl("https://api.twelvedata.com").build();
    }

    // Example GET request:
    // https://api.twelvedata.com/time_series?symbol=AAPL&interval=1min&apikey=your_api_key

    // Valid intervals: 1min, 5min, 15min, 30min, 45min, 1h, 2h, 4h, 1day, 1week, 1month
    public Mono<String> getAssetData(String ticker, String interval) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/time_series")
                        .queryParam("symbol", ticker)
                        .queryParam("interval", interval)
                        .queryParam("outputsize", 5000) // Number of data points to get (5k is max)
                        .queryParam("apiKey", twelveDataApiKey)
                        .build())
                .retrieve()
                .bodyToMono(String.class);
    }

    // Top 50 mutual funds (by total asset value)
    public Mono<String> getPopularMutualFunds() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/mutual_funds/lists")
                        .queryParam("outputsize", 50) // Number of data points to get back
                        .queryParam("apiKey", twelveDataApiKey)
                        .build())
                .retrieve()
                .bodyToMono(String.class);
    }

    // The following methods will return lists containing all symbols of the requested asset type

    public Mono<String> getStocksList() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/stocks")
                        .build())
                .retrieve()
                .bodyToMono(String.class);
    }

    public Mono<String> getETFsList() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/etfs")
                        .build())
                .retrieve()
                .bodyToMono(String.class);
    }

    public Mono<String> getCryptoList() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/cryptocurrencies")
                        .build())
                .retrieve()
                .bodyToMono(String.class);
    }

    public Mono<String> getMutualFundsList() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/funds")
                        .build())
                .retrieve()
                .bodyToMono(String.class);
    }

    public Mono<String> getBondsList() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/bonds")
                        .build())
                .retrieve()
                .bodyToMono(String.class);
    }
}