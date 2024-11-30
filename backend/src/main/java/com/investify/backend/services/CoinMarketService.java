package com.investify.backend.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

@Service
public class CoinMarketService {

    @Value("${spring.api.key.coinMarket}")
    private String coinMarketApiKey;

    private final WebClient webClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    public CoinMarketService(WebClient.Builder coinMarketWebClientBuilder) {
        this.webClient = coinMarketWebClientBuilder
                .baseUrl("https://pro-api.coinmarketcap.com")
                .defaultHeader("Accept", "application/json")
                .build();
    }

    public Mono<Map<String, Object>> getPopularCrypto() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1/cryptocurrency/listings/latest")
                        .queryParam("limit", 50)
                        .queryParam("convert", "USD")
                        .queryParam("CMC_PRO_API_KEY", coinMarketApiKey)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .flatMap(this::transformPopularCryptoResponse); // Transform the response to Map
    }

    private Mono<Map<String, Object>> transformPopularCryptoResponse(String jsonResponse) {
        try {
            // Parse the JSON response into a JsonNode tree
            JsonNode rootNode = objectMapper.readTree(jsonResponse);

            // Navigate to the 'data' array
            JsonNode dataNode = rootNode.get("data");
            ArrayNode cryptoArray = objectMapper.createArrayNode();

            for (JsonNode crypto : dataNode) {
                ObjectNode cryptoObj = objectMapper.createObjectNode();
                cryptoObj.put("name", crypto.get("name").asText());
                cryptoObj.put("symbol", crypto.get("symbol").asText());

                // Get the 'quote' -> 'USD' fields
                JsonNode usdQuote = crypto.get("quote").get("USD");
                cryptoObj.put("price", usdQuote.get("price").asDouble());
                cryptoObj.put("volume_24h", usdQuote.get("volume_24h").asDouble());
                cryptoObj.put("percent_change_24h", usdQuote.get("percent_change_24h").asDouble());
                cryptoObj.put("market_cap", usdQuote.get("market_cap").asDouble());

                cryptoArray.add(cryptoObj);
            }

            // Create the final result map
            ObjectNode result = objectMapper.createObjectNode();
            result.set("crypto", cryptoArray);

            // Convert the ObjectNode to a Map
            Map<String, Object> resultMap = objectMapper.convertValue(result, new TypeReference<>() {});
            return Mono.just(resultMap);

        } catch (Exception e) {
            e.printStackTrace();
            // Return an error map in case of failure
            Map<String, Object> errorMap = new HashMap<>();
            errorMap.put("error", "Failed to parse crypto data");
            return Mono.just(errorMap);
        }
    }
}
