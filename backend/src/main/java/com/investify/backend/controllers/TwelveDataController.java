package com.investify.backend.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.investify.backend.services.TwelveDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.io.IOException;

@RestController
@RequestMapping("/api/twelveData")
public class TwelveDataController {

    @Autowired
    private TwelveDataService twelveDataService;

    @GetMapping("/assetData/{symbol}/{interval}")
    public Mono<String> getAssetData(@PathVariable String symbol, @PathVariable String interval) {
        return twelveDataService.getAssetData(symbol, interval)
                .map(this::transformTimeSeriesData);
    }

    @GetMapping("/popular/funds")
    public Mono<String> getPopularFunds() {
        return twelveDataService.getPopularFunds()
                .map(this::transformFundsResponse);
    }

    @GetMapping("/popular/etfs")
    public Mono<String> getPopularEtfs() {
        return twelveDataService.getPopularETFs()
                .map(this::transformETFsResponse);
    }

    // Get all lists by calling the other APIs and returning a formatted JSON object

    @GetMapping("/stocks/list")
    public Mono<String> getStocksList() {
        return twelveDataService.getStocksList();
    }

    @GetMapping("/etfs/list")
    public Mono<String> getEtfsList() {
        return twelveDataService.getETFsList();
    }

    @GetMapping("/crypto/list")
    public Mono<String> getCryptoList() {
        return twelveDataService.getCryptoList();
    }

    @GetMapping("/funds/list")
    public Mono<String> getFundsList() {
        return twelveDataService.getFundsList();
    }

    @GetMapping("/bonds/list")
    public Mono<String> getBondsList() {
        return twelveDataService.getBondsList();
    }

    public String transformTimeSeriesData(String jsonResponse) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();

            // Parse the JSON response
            JsonNode root = objectMapper.readTree(jsonResponse);
            JsonNode values = root.get("values");

            // Transform to desired format
            ArrayNode resultArray = objectMapper.createArrayNode();
            values.forEach(value -> {
                String datetime = value.get("datetime").asText();
                double closeValue = value.get("close").asDouble();

                ObjectNode transformedObject = objectMapper.createObjectNode();
                transformedObject.put("time", datetime);
                transformedObject.put("value", closeValue);

                resultArray.add(transformedObject);
            });

            // Wrap the transformed values
            ObjectNode responseObject = objectMapper.createObjectNode();
            responseObject.set("values", resultArray);

            return objectMapper.writeValueAsString(responseObject);

        } catch (IOException e) {
            e.printStackTrace();
            return "{\"error\": \"Failed to transform data\"}";
        }
    }

    private String transformFundsResponse(String jsonResponse) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();

            // Parse the JSON response
            JsonNode root = objectMapper.readTree(jsonResponse);
            JsonNode list = root.path("result").path("list");

            // Create the new structure
            ArrayNode fundsArray = objectMapper.createArrayNode();
            list.forEach(fund -> {
                ObjectNode transformedFund = objectMapper.createObjectNode();
                transformedFund.put("symbol", fund.get("symbol").asText());
                transformedFund.put("name", fund.get("name").asText());
                transformedFund.put("country", fund.get("country").asText());
                transformedFund.put("fund_family", fund.get("fund_family").asText());
                transformedFund.put("fund_type", fund.get("fund_type").asText());
                transformedFund.put("performance_rating", fund.get("performance_rating").asInt());
                transformedFund.put("risk_rating", fund.get("risk_rating").asInt());
                transformedFund.put("exchange", fund.get("exchange").asText());
                transformedFund.put("mic_code", fund.get("mic_code").asText());

                fundsArray.add(transformedFund);
            });

            // Wrap in the "funds" object
            ObjectNode responseObject = objectMapper.createObjectNode();
            responseObject.set("funds", fundsArray);

            return objectMapper.writeValueAsString(responseObject);

        } catch (IOException e) {
            e.printStackTrace();
            return "{\"error\": \"Failed to transform data\"}";
        }
    }

    private String transformETFsResponse(String jsonResponse) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();

            // Parse the JSON response
            JsonNode root = objectMapper.readTree(jsonResponse);
            JsonNode list = root.path("result").path("list");

            // Create the new structure
            ArrayNode ETFsArray = objectMapper.createArrayNode();
            list.forEach(fund -> {
                ObjectNode transformedFund = objectMapper.createObjectNode();
                transformedFund.put("symbol", fund.get("symbol").asText());
                transformedFund.put("name", fund.get("name").asText());
                transformedFund.put("country", fund.get("country").asText());
                transformedFund.put("mic_code", fund.get("mic_code").asText());
                transformedFund.put("fund_family", fund.get("fund_family").asText());
                transformedFund.put("fund_type", fund.get("fund_type").asText());
                ETFsArray.add(transformedFund);
            });

            // Wrap in the "funds" object
            ObjectNode responseObject = objectMapper.createObjectNode();
            responseObject.set("etfs", ETFsArray);

            return objectMapper.writeValueAsString(responseObject);

        } catch (IOException e) {
            e.printStackTrace();
            return "{\"error\": \"Failed to transform data\"}";
        }
    }
}