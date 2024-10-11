package com.investify.backend.controllers;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.investify.backend.services.CoinMarketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.io.IOException;

@RestController
@RequestMapping("/api/coinMarket")

public class CoinMarketController {
    @Autowired
    private CoinMarketService coinMarketService;
    @GetMapping("/popular/crypto")
    public Mono<String> getPopularCrypto() {
        return coinMarketService.getPopularCrypto()
                .map(this::transformPopularCryptoResponse);
    }

    public String transformPopularCryptoResponse(String jsonResponse) {
        // Parse the JSON response (assuming it's a string) to extract the needed fields
        JsonNode rootNode;
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            rootNode = objectMapper.readTree(jsonResponse);

            // Navigate to the 'data' array
            JsonNode dataNode = rootNode.get("data");

            // Create a JSON array to hold the processed crypto data
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

                // Add to the crypto array
                cryptoArray.add(cryptoObj);
            }

            // Wrap the array in a root object
            ObjectNode result = objectMapper.createObjectNode();
            result.set("crypto", cryptoArray);

            // Return the result as a string
            return result.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\":\"Failed to parse crypto data\"}";
        }
    }
}