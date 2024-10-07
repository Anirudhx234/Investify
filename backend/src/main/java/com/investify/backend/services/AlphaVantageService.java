package com.investify.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@PropertySource("classpath:application-APIs.properties")
public class AlphaVantageService {

    @Value("${alphaVantage.api.key}")
    private String alphaVantageApiKey;

    private final WebClient webClient;

    @Autowired
    public AlphaVantageService(WebClient.Builder alphaVantageWebClientBuilder) {
        this.webClient = alphaVantageWebClientBuilder.baseUrl("https://www.alphavantage.co").build();
    }

    // Example GET request:
    // https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=

    public Mono<String> getPopularStocks() {
        System.out.println(alphaVantageApiKey);
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/query")
                        .queryParam("function", "TOP_GAINERS_LOSERS")
                        .queryParam("apikey", alphaVantageApiKey)
                        .build())
                .retrieve()
                .bodyToMono(String.class);
    }

    public Mono<String> getTopGainers() {
        System.out.println(alphaVantageApiKey);
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/query")
                        .queryParam("function", "TOP_GAINERS_LOSERS")
                        .queryParam("apikey", alphaVantageApiKey)
                        .build())
                .retrieve()
                .bodyToMono(String.class);
    }

    public Mono<String> getTopLosers() {
        System.out.println(alphaVantageApiKey);
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/query")
                        .queryParam("function", "TOP_GAINERS_LOSERS")
                        .queryParam("apikey", alphaVantageApiKey)
                        .build())
                .retrieve()
                .bodyToMono(String.class);
    }

    // function "TOP_GAINERS_LOSERS" returns actively-traded (most popular) stocks, losers and gainers
    // JSON: {
    //    "metadata": "Top gainers, losers, and most actively traded US tickers",
    //    "last_updated": "2024-10-04 16:15:59 US/Eastern",
    //    "top_gainers": [
    //        {
    //            "ticker": "CHSN",
    //            "price": "14.81",
    //            "change_amount": "11.77",
    //            "change_percentage": "387.1711%",
    //            "volume": "10785268"
    //        },
    //        {
    //            "ticker": "PEV",
    //            "price": "1.07",
    //            "change_amount": "0.7225",
    //            "change_percentage": "207.9137%",
    //            "volume": "226519966"
    //        },
    //        {
    //            "ticker": "IVDAW",
    //            "price": "0.03",
    //            "change_amount": "0.0183",
    //            "change_percentage": "156.4103%",
    //            "volume": "33419"
    //        },
    //        {
    //            "ticker": "SWAGW",
    //            "price": "0.0244",
    //            "change_amount": "0.0137",
    //            "change_percentage": "128.0374%",
    //            "volume": "2671"
    //        },
    //        {
    //            "ticker": "KACLW",
    //            "price": "0.0285",
    //            "change_amount": "0.0158",
    //            "change_percentage": "124.4094%",
    //            "volume": "1792"
    //        },
    //        {
    //            "ticker": "FGIWW",
    //            "price": "0.13",
    //            "change_amount": "0.0694",
    //            "change_percentage": "114.5215%",
    //            "volume": "4335"
    //        },
    //        {
    //            "ticker": "MOBXW",
    //            "price": "0.1758",
    //            "change_amount": "0.0758",
    //            "change_percentage": "75.8%",
    //            "volume": "4269"
    //        },
    //        {
    //            "ticker": "ENTO",
    //            "price": "0.5997",
    //            "change_amount": "0.2537",
    //            "change_percentage": "73.3237%",
    //            "volume": "9515734"
    //        },
    //        {
    //            "ticker": "NKGNW",
    //            "price": "0.06",
    //            "change_amount": "0.025",
    //            "change_percentage": "71.4286%",
    //            "volume": "86424"
    //        },
    //        {
    //            "ticker": "IROHW",
    //            "price": "0.0533",
    //            "change_amount": "0.021",
    //            "change_percentage": "65.0155%",
    //            "volume": "1500"
    //        },
    //        {
    //            "ticker": "BIAFW",
    //            "price": "2.0",
    //            "change_amount": "0.75",
    //            "change_percentage": "60.0%",
    //            "volume": "7819"
    //        },
    //        {
    //            "ticker": "BENF",
    //            "price": "1.89",
    //            "change_amount": "0.7",
    //            "change_percentage": "58.8235%",
    //            "volume": "107433435"
    //        },
    //        {
    //            "ticker": "FORD",
    //            "price": "5.38",
    //            "change_amount": "1.85",
    //            "change_percentage": "52.4079%",
    //            "volume": "18363968"
    //        },
    //        {
    //            "ticker": "AUUDW",
    //            "price": "0.047",
    //            "change_amount": "0.016",
    //            "change_percentage": "51.6129%",
    //            "volume": "465"
    //        },
    //        {
    //            "ticker": "LSBPW",
    //            "price": "0.074",
    //            "change_amount": "0.0246",
    //            "change_percentage": "49.7976%",
    //            "volume": "4650"
    //        },
    //        {
    //            "ticker": "FORLW",
    //            "price": "0.08",
    //            "change_amount": "0.0265",
    //            "change_percentage": "49.5327%",
    //            "volume": "7550"
    //        },
    //        {
    //            "ticker": "MTEKW",
    //            "price": "0.135",
    //            "change_amount": "0.0432",
    //            "change_percentage": "47.0588%",
    //            "volume": "1000"
    //        },
    //        {
    //            "ticker": "EVEX+",
    //            "price": "0.1288",
    //            "change_amount": "0.0388",
    //            "change_percentage": "43.1111%",
    //            "volume": "11311"
    //        },
    //        {
    //            "ticker": "EUDAW",
    //            "price": "0.0996",
    //            "change_amount": "0.0296",
    //            "change_percentage": "42.2857%",
    //            "volume": "1331"
    //        },
    //        {
    //            "ticker": "CUE",
    //            "price": "1.16",
    //            "change_amount": "0.3408",
    //            "change_percentage": "41.6016%",
    //            "volume": "5985953"
    //        }
    //    ],
    //    "top_losers": [
    //        {
    //            "ticker": "PAVMZ",
    //            "price": "0.0121",
    //            "change_amount": "-0.0279",
    //            "change_percentage": "-69.75%",
    //            "volume": "2381"
    //        },
    //        {
    //            "ticker": "GUT^",
    //            "price": "0.0054",
    //            "change_amount": "-0.0094",
    //            "change_percentage": "-63.5135%",
    //            "volume": "713308"
    //        },
    //        {
    //            "ticker": "SEDA+",
    //            "price": "0.03",
    //            "change_amount": "-0.0503",
    //            "change_percentage": "-62.6401%",
    //            "volume": "27196"
    //        },
    //        {
    //            "ticker": "BCSAW",
    //            "price": "0.004",
    //            "change_amount": "-0.0054",
    //            "change_percentage": "-57.4468%",
    //            "volume": "45336"
    //        },
    //        {
    //            "ticker": "BSLKW",
    //            "price": "0.027",
    //            "change_amount": "-0.033",
    //            "change_percentage": "-55.0%",
    //            "volume": "200"
    //        },
    //        {
    //            "ticker": "COOTW",
    //            "price": "0.0122",
    //            "change_amount": "-0.0114",
    //            "change_percentage": "-48.3051%",
    //            "volume": "12310"
    //        },
    //        {
    //            "ticker": "PNST+",
    //            "price": "0.0103",
    //            "change_amount": "-0.0096",
    //            "change_percentage": "-48.2412%",
    //            "volume": "59913"
    //        },
    //        {
    //            "ticker": "WLDSW",
    //            "price": "0.0099",
    //            "change_amount": "-0.0083",
    //            "change_percentage": "-45.6044%",
    //            "volume": "7202"
    //        },
    //        {
    //            "ticker": "SATLW",
    //            "price": "0.0522",
    //            "change_amount": "-0.0378",
    //            "change_percentage": "-42.0%",
    //            "volume": "6330"
    //        },
    //        {
    //            "ticker": "ADD",
    //            "price": "0.2671",
    //            "change_amount": "-0.1829",
    //            "change_percentage": "-40.6444%",
    //            "volume": "14605453"
    //        },
    //        {
    //            "ticker": "RMCOW",
    //            "price": "0.012",
    //            "change_amount": "-0.008",
    //            "change_percentage": "-40.0%",
    //            "volume": "3400"
    //        },
    //        {
    //            "ticker": "BCTXW",
    //            "price": "0.2503",
    //            "change_amount": "-0.1581",
    //            "change_percentage": "-38.712%",
    //            "volume": "9508"
    //        },
    //        {
    //            "ticker": "CRGOW",
    //            "price": "0.0619",
    //            "change_amount": "-0.0377",
    //            "change_percentage": "-37.8514%",
    //            "volume": "7766"
    //        },
    //        {
    //            "ticker": "CMAXW",
    //            "price": "0.0061",
    //            "change_amount": "-0.0035",
    //            "change_percentage": "-36.4583%",
    //            "volume": "1221"
    //        },
    //        {
    //            "ticker": "HPAIW",
    //            "price": "0.07",
    //            "change_amount": "-0.04",
    //            "change_percentage": "-36.3636%",
    //            "volume": "1"
    //        },
    //        {
    //            "ticker": "ABVEW",
    //            "price": "0.016",
    //            "change_amount": "-0.0085",
    //            "change_percentage": "-34.6939%",
    //            "volume": "13182"
    //        },
    //        {
    //            "ticker": "SONDW",
    //            "price": "0.0085",
    //            "change_amount": "-0.0045",
    //            "change_percentage": "-34.6154%",
    //            "volume": "22089"
    //        },
    //        {
    //            "ticker": "RELIW",
    //            "price": "0.046",
    //            "change_amount": "-0.024",
    //            "change_percentage": "-34.2857%",
    //            "volume": "2500"
    //        },
    //        {
    //            "ticker": "DUO",
    //            "price": "2.53",
    //            "change_amount": "-1.24",
    //            "change_percentage": "-32.8912%",
    //            "volume": "27282517"
    //        },
    //        {
    //            "ticker": "DUETW",
    //            "price": "0.0202",
    //            "change_amount": "-0.0097",
    //            "change_percentage": "-32.4415%",
    //            "volume": "198"
    //        }
    //    ],
    //    "most_actively_traded": [
    //        {
    //            "ticker": "NVDA",
    //            "price": "124.92",
    //            "change_amount": "2.07",
    //            "change_percentage": "1.685%",
    //            "volume": "242116831"
    //        },
    //        {
    //            "ticker": "PEV",
    //            "price": "1.07",
    //            "change_amount": "0.7225",
    //            "change_percentage": "207.9137%",
    //            "volume": "226519966"
    //        },
    //        {
    //            "ticker": "SQQQ",
    //            "price": "7.43",
    //            "change_amount": "-0.28",
    //            "change_percentage": "-3.6316%",
    //            "volume": "182063268"
    //        },
    //        {
    //            "ticker": "NCNC",
    //            "price": "0.1426",
    //            "change_amount": "0.01",
    //            "change_percentage": "7.5415%",
    //            "volume": "145082725"
    //        },
    //        {
    //            "ticker": "BENF",
    //            "price": "1.89",
    //            "change_amount": "0.7",
    //            "change_percentage": "58.8235%",
    //            "volume": "107433435"
    //        },
    //        {
    //            "ticker": "SOXL",
    //            "price": "36.71",
    //            "change_amount": "1.5",
    //            "change_percentage": "4.2602%",
    //            "volume": "100089079"
    //        },
    //        {
    //            "ticker": "FXI",
    //            "price": "35.76",
    //            "change_amount": "1.26",
    //            "change_percentage": "3.6522%",
    //            "volume": "98881024"
    //        },
    //        {
    //            "ticker": "TELL",
    //            "price": "0.976",
    //            "change_amount": "0.0059",
    //            "change_percentage": "0.6082%",
    //            "volume": "92322390"
    //        },
    //        {
    //            "ticker": "NIO",
    //            "price": "6.775",
    //            "change_amount": "0.075",
    //            "change_percentage": "1.1194%",
    //            "volume": "91060269"
    //        },
    //        {
    //            "ticker": "TSLA",
    //            "price": "250.08",
    //            "change_amount": "9.42",
    //            "change_percentage": "3.9142%",
    //            "volume": "86154388"
    //        },
    //        {
    //            "ticker": "YANG",
    //            "price": "2.76",
    //            "change_amount": "-0.3",
    //            "change_percentage": "-9.8039%",
    //            "volume": "78281990"
    //        },
    //        {
    //            "ticker": "RIVN",
    //            "price": "10.44",
    //            "change_amount": "-0.34",
    //            "change_percentage": "-3.154%",
    //            "volume": "76278696"
    //        },
    //        {
    //            "ticker": "TIGR",
    //            "price": "12.39",
    //            "change_amount": "3.2",
    //            "change_percentage": "34.8205%",
    //            "volume": "76094685"
    //        },
    //        {
    //            "ticker": "TSLL",
    //            "price": "12.54",
    //            "change_amount": "0.87",
    //            "change_percentage": "7.455%",
    //            "volume": "68134096"
    //        },
    //        {
    //            "ticker": "SOXS",
    //            "price": "20.02",
    //            "change_amount": "-0.85",
    //            "change_percentage": "-4.0728%",
    //            "volume": "65138258"
    //        },
    //        {
    //            "ticker": "PLTR",
    //            "price": "40.01",
    //            "change_amount": "0.77",
    //            "change_percentage": "1.9623%",
    //            "volume": "62325318"
    //        },
    //        {
    //            "ticker": "EVGO",
    //            "price": "7.2",
    //            "change_amount": "0.88",
    //            "change_percentage": "13.9241%",
    //            "volume": "61346770"
    //        },
    //        {
    //            "ticker": "SOFI",
    //            "price": "8.39",
    //            "change_amount": "0.56",
    //            "change_percentage": "7.152%",
    //            "volume": "57743292"
    //        },
    //        {
    //            "ticker": "TLT",
    //            "price": "95.55",
    //            "change_amount": "-1.19",
    //            "change_percentage": "-1.2301%",
    //            "volume": "55563835"
    //        },
    //        {
    //            "ticker": "TQQQ",
    //            "price": "71.97",
    //            "change_amount": "2.45",
    //            "change_percentage": "3.5242%",
    //            "volume": "55021056"
    //        }
    //    ]
    //}
}