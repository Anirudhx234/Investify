import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class PolygonService {

    @Value("${polygon.api.key}")
    private String polygonApiKey;

    private final WebClient webClient;

    public PolygonService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.polygon.io").build();
    }

    public Mono<String> getStockData(String ticker) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1/last/stocks/{ticker}")
                        .queryParam("apiKey", polygonApiKey)
                        .build(ticker))
                .retrieve()
                .bodyToMono(String.class);
    }
}