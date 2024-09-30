package com.investify.backend.controller;

import com.investify.backend.service.NewsScrapingService;
import com.investify.backend.service.TwelveDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
public class AssetController {

    @Autowired
    private TwelveDataService twelveDataService;

    private NewsScrapingService newsScrapingService;

    @GetMapping("/assets/{assetName}/data")
    public String getAssetData(@PathVariable String assetName) {
        return twelveDataService.getAssetData(assetName);
    }

    @GetMapping("/assets/{assetName}/news")
    public List<String> getAssetNews(@PathVariable String assetName) throws IOException {
        return newsScrapingService.extractNews(assetName);
    }

    @GetMapping("/assets/crypto")
    public String getCryptocurrencyData() {
        return twelveDataService.getCryptocurrencyData();
    }
}