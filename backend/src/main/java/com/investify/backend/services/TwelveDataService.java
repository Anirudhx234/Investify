package com.investify.backend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

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

    public Mono<Map<String, List<Map<String, String>>>> searchForAssets(String symbol) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/symbol_search")
                        .queryParam("symbol", symbol)
                        .queryParam("source", "docs")
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .map(this::parseSearchAssets);
    }

    private Map<String, List<Map<String, String>>> parseSearchAssets(String jsonResponse) {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> parsedResponse;

        try {
            parsedResponse = objectMapper.readValue(jsonResponse, new TypeReference<>() {});
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to parse API response", e);
        }

        List<Map<String, String>> data = (List<Map<String, String>>) parsedResponse.get("data");

        // Initialize categorized asset lists
        List<Map<String, String>> stocks = new ArrayList<>();
        List<Map<String, String>> mutualFunds = new ArrayList<>();
        List<Map<String, String>> etfs = new ArrayList<>();
        List<Map<String, String>> cryptocurrencies = new ArrayList<>();

        // Sets to track unique symbol-name pairs for each asset type
        Set<String> stockSet = new HashSet<>();
        Set<String> mutualFundSet = new HashSet<>();
        Set<String> etfSet = new HashSet<>();
        Set<String> cryptoSet = new HashSet<>();

        // Categorize the assets based on their instrument type
        for (Map<String, String> asset : data) {
            String type = asset.get("instrument_type").toLowerCase();
            String symbol = asset.get("symbol");
            String name = asset.get("instrument_name");
            String uniqueKey = symbol; // Unique key for tracking duplicates

            Map<String, String> assetInfo = Map.of(
                    "symbol", symbol,
                    "name", name
            );

            switch (type) {
                case "common stock":
                case "preferred stock":
                    if (stockSet.add(uniqueKey)) {
                        stocks.add(assetInfo);
                    }
                    break;
                case "mutual fund":
                    if (mutualFundSet.add(uniqueKey)) {
                        mutualFunds.add(assetInfo);
                    }
                    break;
                case "etf":
                    if (etfSet.add(uniqueKey)) {
                        etfs.add(assetInfo);
                    }
                    break;
                case "digital currency":
                    if (cryptoSet.add(uniqueKey)) {
                        cryptocurrencies.add(assetInfo);
                    }
                    break;
                default:
                    // Ignore other types or handle them as needed
                    break;
            }
        }

        // Return the final structured JSON response
        return Map.of(
                "stocks", stocks,
                "mutual-funds", mutualFunds,
                "etfs", etfs,
                "crypto", cryptocurrencies
        );
    }


    // Example GET request:
    // https://api.twelvedata.com/time_series?symbol=AAPL&interval=1min&apikey=your_api_key

    // Valid intervals: 1min, 5min, 15min, 30min, 45min, 1h, 2h, 4h, 1day, 1week, 1month
    public Mono<Map> getAssetTimeSeries(String ticker, String interval) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/time_series")
                        .queryParam("symbol", ticker)
                        .queryParam("interval", interval)
                        .queryParam("outputsize", 5000) // Number of data points to get (5k is max)
                        .queryParam("apikey", twelveDataApiKey)
                        .build())
                .retrieve()
                .bodyToMono(Map.class); // Parse response directly into a Map
    }

    public Mono<Map> getAssetQuote(String ticker, String interval) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/quote")
                        .queryParam("symbol", ticker)
                        .queryParam("interval", interval)
                        .queryParam("outputsize", 5000) // Number of data points to get (5k is max)
                        .queryParam("apikey", twelveDataApiKey)
                        .queryParam("source", "docs")
                        .build())
                .retrieve()
                .bodyToMono(Map.class);
    }

    // Get current price of an asset
    public Mono<String> getLivePrice(String symbol) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        ObjectMapper objectMapper = new ObjectMapper();

        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/price")
                        .queryParam("symbol", symbol)
                        .queryParam("apikey", twelveDataApiKey)
                        .queryParam("source", "docs")
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .flatMap(priceResponse -> {
                    try {
                        // Parse the API response to extract the price
                        JsonNode jsonNode = objectMapper.readTree(priceResponse);
                        double price = jsonNode.get("price").asDouble();
                        String datetime = LocalDateTime.now().format(formatter);

                        // Create a new response object
                        return Mono.just(String.format("{\"symbol\":\"%s\", \"price\":%s, \"datetime\":\"%s\"}", symbol, price, datetime));
                    } catch (Exception e) {
                        return Mono.error(new RuntimeException("Failed to parse API response", e));
                    }
                });
    }

    // Top 50 mutual funds (by total asset value)
    public Mono<Map> getPopularMutualFunds() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/mutual_funds/list")
                        .queryParam("outputsize", 50) // Number of data points to get back
                        .queryParam("apikey", twelveDataApiKey)
                        .build())
                .retrieve()
                .bodyToMono(Map.class);
    }

    // Top 50 mutual funds (by total asset value)
    public Mono<Map> getPopularETFs() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/etfs/list")
                        .queryParam("outputsize", 50) // Number of data points to get back
                        .queryParam("apikey", twelveDataApiKey)
                        .build())
                .retrieve()
                .bodyToMono(Map.class);
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

    public Mono<Map> getCryptoList() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/cryptocurrencies")
                        .build())
                .retrieve()
                .bodyToMono(Map.class);
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