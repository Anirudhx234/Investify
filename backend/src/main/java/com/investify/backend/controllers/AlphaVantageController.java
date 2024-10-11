package com.investify.backend.controllers;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.investify.backend.services.AlphaVantageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.io.IOException;

@RestController
@RequestMapping("/api/alphaVantage")
public class AlphaVantageController {

    @Autowired
    private AlphaVantageService alphaVantageService;

    @GetMapping("/popular/stocks")
    public Mono<String> getPopularStocks() {
        return alphaVantageService.getPopularStocks()
                .map(this::transformPopularResponse);
    }

    @GetMapping("/top/gainers")
    public Mono<String> getTopGainers() {
        return alphaVantageService.getTopGainers()
                .map(this::transformGainersResponse);
    }

    @GetMapping("/top/losers")
    public Mono<String> getTopLosers() {
        return alphaVantageService.getTopLosers()
                .map(this::transformLosersResponse);
    }

    public String transformPopularResponse(String jsonResponse) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();

            // Parse the JSON response
            JsonNode root = objectMapper.readTree(jsonResponse);
            JsonNode list = root.path("most_actively_traded");

            // Create the new structure
            ArrayNode assetsList = objectMapper.createArrayNode();
            list.forEach(fund -> {
                ObjectNode transformedFund = objectMapper.createObjectNode();
                transformedFund.put("symbol", fund.get("ticker").asText());
                transformedFund.put("name", fund.get("ticker").asText());
                transformedFund.put("price", fund.get("price").asText());
                transformedFund.put("change_amount", fund.get("change_amount").asText());
                transformedFund.put("change_percentage", fund.get("change_percentage").asText());
                transformedFund.put("volume", fund.get("volume").asText());
                assetsList.add(transformedFund);
            });

            // Wrap in the "funds" object
            ObjectNode responseObject = objectMapper.createObjectNode();
            responseObject.set("stocks", assetsList);

            return objectMapper.writeValueAsString(responseObject);

        } catch (IOException e) {
            e.printStackTrace();
            return "{\"error\": \"Failed to transform data\"}";
        }
    }

    public String transformLosersResponse(String jsonResponse) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();

            // Parse the JSON response
            JsonNode root = objectMapper.readTree(jsonResponse);
            JsonNode list = root.path("top_losers");

            // Create the new structure
            ArrayNode assetsList = objectMapper.createArrayNode();
            list.forEach(fund -> {
                ObjectNode transformedFund = objectMapper.createObjectNode();
                transformedFund.put("symbol", fund.get("ticker").asText());
                transformedFund.put("name", fund.get("ticker").asText());
                transformedFund.put("price", fund.get("price").asText());
                transformedFund.put("change_amount", fund.get("change_amount").asText());
                transformedFund.put("change_percentage", fund.get("change_percentage").asText());
                transformedFund.put("volume", fund.get("volume").asText());
                assetsList.add(transformedFund);
            });

            // Wrap in the "funds" object
            ObjectNode responseObject = objectMapper.createObjectNode();
            responseObject.set("stocks", assetsList);

            return objectMapper.writeValueAsString(responseObject);

        } catch (IOException e) {
            e.printStackTrace();
            return "{\"error\": \"Failed to transform data\"}";
        }
    }

    public String transformGainersResponse(String jsonResponse) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();

            // Parse the JSON response
            JsonNode root = objectMapper.readTree(jsonResponse);
            JsonNode list = root.path("top_gainers");

            // Create the new structure
            ArrayNode assetsList = objectMapper.createArrayNode();
            list.forEach(fund -> {
                ObjectNode transformedFund = objectMapper.createObjectNode();
                transformedFund.put("symbol", fund.get("ticker").asText());
                transformedFund.put("name", fund.get("ticker").asText());
                transformedFund.put("price", fund.get("price").asText());
                transformedFund.put("change_amount", fund.get("change_amount").asText());
                transformedFund.put("change_percentage", fund.get("change_percentage").asText());
                transformedFund.put("volume", fund.get("volume").asText());
                assetsList.add(transformedFund);
            });

            // Wrap in the "funds" object
            ObjectNode responseObject = objectMapper.createObjectNode();
            responseObject.set("stocks", assetsList);

            return objectMapper.writeValueAsString(responseObject);

        } catch (IOException e) {
            e.printStackTrace();
            return "{\"error\": \"Failed to transform data\"}";
        }
    }
}