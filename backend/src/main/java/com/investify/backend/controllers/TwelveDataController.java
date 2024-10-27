package com.investify.backend.controllers;

import com.investify.backend.services.TwelveDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/twelveData")
public class TwelveDataController {

    @Autowired
    private TwelveDataService twelveDataService;

    @GetMapping("/assetData/{symbol}/{interval}")
    public Mono<String> getStockData(@PathVariable String symbol, @PathVariable String interval) {
        return twelveDataService.getAssetData(symbol, interval);
    }

    @GetMapping("/quote/{symbol}/{interval}")
    public Mono<String> getQuote(@PathVariable String symbol, @PathVariable String interval) {
        return twelveDataService.getAssetQuote(symbol, interval);
    }

    @GetMapping("/popular/funds")
    public Mono<String> getPopularFunds() {
        return twelveDataService.getPopularFunds();
    }

    @GetMapping("/popular/etfs")
    public Mono<String> getPopularEtfs() {
        return twelveDataService.getPopularETFs();
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
}