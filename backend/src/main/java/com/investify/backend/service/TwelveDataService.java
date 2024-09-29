package com.investify.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class TwelveDataService {

    @Value("${twelvedata.api.key}")
    private String apiKey;

    @Value("${twelvedata.api.url}")
    private String baseUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getAssetData(String assetName) {
        String url = baseUrl + "/time_series?symbol=" + assetName + "interval=1min&apikey=" + apiKey;

        Map<String, Object> response = restTemplate.getForObject(url, HashMap.class);

        return response != null ? response.toString() : "No data available";
    }
}