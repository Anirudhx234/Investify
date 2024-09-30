package com.investify.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class TwelveDataService {

    @Value("${twelvedata.api.key}")
    private String apiKey;

    @Value("${twelvedata.api.url}")
    private String baseUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getAssetDataFromAPI(String assetName, int intervalTime) {
        String url = baseUrl + "/time_series?symbol=" + assetName + "interval=" + intervalTime + "min&apikey=" + apiKey;

        Map<String, Object> response = restTemplate.getForObject(url, HashMap.class);

        return response != null ? response.toString() : "No data available";
    }

    public String getCryptocurrencyDataFromAPI() {
        String url = baseUrl + "/cryptocurrencies";

        Map<String, Object> response = restTemplate.getForObject(url, HashMap.class);

        return response != null ? response.toString() : "No data available";
    }

    public String getAssetData(String assetName) {
        String jsonString = getAssetDataFromAPI(assetName, 1);
        ObjectMapper mapper = new ObjectMapper();
        StringBuilder tableBuilder = new StringBuilder();

        try {
            JsonNode rootNode = mapper.readTree(jsonString);

            JsonNode valuesNode = rootNode.get("values");

            if (valuesNode.isArray()) {
                tableBuilder.append(String.format("%-20s %-10s %-10s %-10s %-10s %-10s%n",
                        "Datetime", "Open", "High", "Low", "Close", "Volume"));

                for (JsonNode node : valuesNode) {
                    String datetime = node.get("datetime").asText();
                    String open = node.get("open").asText();
                    String high = node.get("high").asText();
                    String low = node.get("low").asText();
                    String close = node.get("close").asText();
                    String volume = node.get("volume").asText();

                    tableBuilder.append(String.format("%-20s %-10s %-10s %-10s %-10s %-10s%n",
                            datetime, open, high, low, close, volume));
                }
            } else {
                tableBuilder.append("No data available.");
            }
        } catch (IOException e) {
            e.printStackTrace();
            return "Error parsing data.";
        }

        return tableBuilder.toString();
    }

    public String getCryptocurrencyData() {
        String jsonString = getCryptocurrencyDataFromAPI();
        ObjectMapper mapper = new ObjectMapper();
        StringBuilder tableBuilder = new StringBuilder();

        try {
            JsonNode rootNode = mapper.readTree(jsonString);

            JsonNode dataArrayNode = rootNode.get("data");

            if (dataArrayNode.isArray()) {
                tableBuilder.append(String.format("%-15s %-20s %-30s %-15s %-15s%n",
                        "Symbol", "Currency Base", "Available Exchanges", "Currency Quote", "Currency Base"));

                for (JsonNode node : dataArrayNode) {
                    String symbol = node.get("symbol").asText();
                    String currencyBase = node.get("currency_base").asText();
                    String currencyQuote = node.get("currency_quote").asText();

                    JsonNode exchangesNode = node.get("available_exchanges");
                    StringBuilder exchanges = new StringBuilder();
                    if (exchangesNode.isArray()) {
                        for (JsonNode exchange : exchangesNode) {
                            exchanges.append(exchange.asText()).append(", ");
                        }
                        if (exchanges.length() > 0) {
                            exchanges.setLength(exchanges.length() - 2);
                        }
                    }

                    tableBuilder.append(String.format("%-15s %-20s %-30s %-15s %-15s%n",
                            symbol, currencyBase, exchanges.toString(), currencyQuote, currencyBase));
                }
            } else {
                tableBuilder.append("No data available.");
            }
        } catch (IOException e) {
            e.printStackTrace();
            return "Error parsing data.";
        }

        return tableBuilder.toString();
    }
}