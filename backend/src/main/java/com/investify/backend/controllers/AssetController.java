package com.investify.backend.controllers;

import com.investify.backend.services.AlphaVantageService;
import com.investify.backend.services.CoinMarketService;
import com.investify.backend.services.PolygonService;
import com.investify.backend.services.TwelveDataService;
import com.investify.backend.services.ScraperService;
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

    @Autowired
    private CoinMarketService coinMarketService;

    @Autowired
    private ScraperService scraperService;

    /* TwelveData */
    @Cacheable(value = "searchAssets", cacheManager = "cacheManager")
    @GetMapping("")
    public Mono<Map<String, List<Map<String, String>>>> searchForAssets(@RequestParam("symbol") String symbol) {
        return twelveDataService.searchForAssets(symbol);
    }

    /* AlphaVantage */
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
    @GetMapping("/time-series/{symbol}")
    public Mono<Map> getAssetTimeSeries(@PathVariable String symbol, @RequestParam("interval") String interval) {
        return twelveDataService.getAssetTimeSeries(symbol, interval);
    }

    @GetMapping("/quote/{symbol}")
    public Mono<Map> getQuote(@PathVariable String symbol, @RequestParam("interval") String interval) {
        return twelveDataService.getAssetQuote(symbol, interval);
    }

    @GetMapping("/popular/stocks")
    public Mono<Map> getPopularStocks() {
        return alphaVantageService.getPopularStocks();
    }

    @GetMapping("/popular/mutual-funds")
    public Mono<Map> getPopularMutualFunds() {
        return twelveDataService.getPopularMutualFunds();
    }

    @GetMapping("/popular/etfs")
    public Mono<Map> getPopularEtfs() {
        return twelveDataService.getPopularETFs();
    }

    @GetMapping("/popular/crypto")
    public Mono<Map<String, Object>> getPopularCrypto() {
        return coinMarketService.getPopularCrypto();
    }

    @GetMapping("/list/stocks")
    public Mono<String> getStocksList() {
        return twelveDataService.getStocksList();
    }

    @GetMapping("/list/mutual-funds")
    public Mono<String> getMutualFundsList() {
        return twelveDataService.getMutualFundsList();
    }

    @GetMapping("/list/etfs")
    public Mono<String> getEtfsList() {
        return twelveDataService.getETFsList();
    }

    @GetMapping("/list/crypto")
    public Mono<Map> getCryptoList() {
        return twelveDataService.getCryptoList();
    }

    /* Scraper */
    @GetMapping("/scraper/{symbol}")
    public List<List<String>> getNewsSources(@PathVariable String symbol) { return scraperService.getNewsSources(symbol); }
}
