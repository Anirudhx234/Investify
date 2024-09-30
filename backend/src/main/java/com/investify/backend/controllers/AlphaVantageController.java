package com.investify.backend.controllers;

import com.investify.backend.services.AlphaVantageService;
import com.investify.backend.services.PolygonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/alphaVantage")
public class AlphaVantageController {

    @Autowired
    private AlphaVantageService alphaVantageService;

    @GetMapping("/popular/stocks")
    public Mono<String> getPopularStocks() {
       return alphaVantageService.getPopularStocks();
    }
}