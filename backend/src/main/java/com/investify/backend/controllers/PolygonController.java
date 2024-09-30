package com.investify.backend.controllers;

import com.investify.backend.services.PolygonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/polygon")
public class PolygonController {

    @Autowired
    private PolygonService polygonService;

    @GetMapping("/stock/{symbol}")
    public Mono<String> getStockData(@PathVariable String symbol) {
        return polygonService.getStockData(symbol);
    }
}