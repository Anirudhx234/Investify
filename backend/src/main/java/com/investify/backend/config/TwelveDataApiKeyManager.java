package com.investify.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class TwelveDataApiKeyManager {

    @Value("${spring.api.key.twelveData}")
    private String apiKeysProperty;

    private List<String> apiKeys;
    private final AtomicInteger apiKeyIndex = new AtomicInteger(0);

    public synchronized void loadApiKeys() {
        if (apiKeys == null) {
            apiKeys = Stream.of(apiKeysProperty.split(","))
                    .map(String::trim)
                    .collect(Collectors.toList());
        }
    }

    public String getNextApiKey() {
        loadApiKeys();
        int index = apiKeyIndex.getAndUpdate(i -> (i + 1) % apiKeys.size());
        return apiKeys.get(index);
    }
}
