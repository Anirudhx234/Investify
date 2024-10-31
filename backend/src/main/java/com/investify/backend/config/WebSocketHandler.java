package com.investify.backend.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.investify.backend.services.TwelveDataService;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledFuture;
import java.util.Map;

public class WebSocketHandler extends TextWebSocketHandler {

    private final TwelveDataService twelveDataService;
    private final Map<String, ScheduledFuture<?>> sessions = new ConcurrentHashMap<>();
    private final ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();

    // Constructor injection for TwelveDataService
    public WebSocketHandler(TwelveDataService twelveDataService) {
        this.twelveDataService = twelveDataService;
        scheduler.initialize();
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String symbol = extractSymbolFromMessage(message.getPayload());

        sessions.computeIfPresent(session.getId(), (id, future) -> {
            future.cancel(true);
            return null;
        });

        ScheduledFuture<?> future = scheduler.scheduleAtFixedRate(
                () -> fetchAndSendPrice(symbol, session), 3000
        );

        sessions.put(session.getId(), future);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) {
        ScheduledFuture<?> future = sessions.remove(session.getId());
        if (future != null) {
            future.cancel(true);
        }
    }

    private String extractSymbolFromMessage(String payload) {
        try {
            Map<String, String> data = new ObjectMapper().readValue(payload, Map.class);
            return data.getOrDefault("symbol", "");
        } catch (Exception e) {
            System.err.println("Invalid message format: " + e.getMessage());
            return "";
        }
    }

    // Helper method to fetch price and send it to the client
    private void fetchAndSendPrice(String symbol, WebSocketSession session) {
        try {
            // Fetch the price synchronously
            double price = twelveDataService.getLivePrice(symbol);

            // Send the message to the client
            sendMessageToClient(session, priceMessage(symbol, price));
        } catch (Exception error) {
            System.err.println("Failed to fetch price for " + symbol + ": " + error.getMessage());
        }
    }

    private String priceMessage(String symbol, double price) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String datetime = LocalDateTime.now().format(formatter);
        return String.format("{\"symbol\":\"%s\", \"price\":%s, \"datetime\":\"%s\"}", symbol, price, datetime);
    }

    private void sendMessageToClient(WebSocketSession session, String message) {
        try {
            session.sendMessage(new TextMessage(message));
            System.out.println("Sent price update: " + message);
        } catch (Exception e) {
            System.err.println("Failed to send message: " + e.getMessage());
        }
    }
}
