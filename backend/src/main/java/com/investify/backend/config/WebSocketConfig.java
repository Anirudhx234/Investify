package com.investify.backend.config;

import com.investify.backend.services.TwelveDataService;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final TwelveDataService twelveDataService;

    public WebSocketConfig(TwelveDataService twelveDataService) {
        this.twelveDataService = twelveDataService;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new WebSocketHandler(twelveDataService), "/prices")
                .setAllowedOrigins("*");
    }
}
