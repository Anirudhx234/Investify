package com.investify.backend.controllers;

import com.investify.backend.services.AlphaVantageService;
import com.investify.backend.services.PolygonService;
import com.investify.backend.services.TwelveDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/assets")
public class AssetController {

    @Autowired
    private TwelveDataService twelveDataService;

    @Autowired
    private AlphaVantageService alphaVantageService;

    @Autowired
    private PolygonService polygonService;

    /* TwelveData */
    @Cacheable(value = "searchAssets", cacheManager = "cacheManager")
    @GetMapping("")
    public Mono<Map<String, List<Map<String, String>>>> searchForAssets(@RequestParam("symbol") String symbol) {
        return twelveDataService.searchForAssets(symbol);
    }

    /* AlphaVantage */
    @GetMapping("/popular/stocks")
    public Mono<String> getPopularStocks() {
        return alphaVantageService.getPopularStocks();
    }

    @GetMapping("/top/gainers")
    public Mono<String> getTopGainers() {
        return alphaVantageService.getTopGainers();
    }

    @GetMapping("/top/losers")
    public Mono<String> getTopLosers() {
        return alphaVantageService.getTopLosers();
    }

    /* Polygon */
    @GetMapping("/stock/{symbol}")
    public Mono<String> getStockData(@PathVariable String symbol) {
        return polygonService.getStockData(symbol);
    }

    /* TwelveData */
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
}
