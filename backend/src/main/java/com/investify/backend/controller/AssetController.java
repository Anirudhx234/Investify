package com.investify.backend.controller;

import com.investify.backend.service.TwelveDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AssetController {

    @Autowired
    private TwelveDataService twelveDataService;

    @GetMapping("/assets/{assetName}/data")
    public String getAssetData(@PathVariable String assetName) {
        return twelveDataService.getAssetData(assetName);
    }
}