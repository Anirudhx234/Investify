package config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient.Builder polygonWebClientBuilder() {
        return WebClient.builder();
    }

    @Bean
    public WebClient.Builder alphaVantageWebClientBuilder() {
        return WebClient.builder();
    }
}