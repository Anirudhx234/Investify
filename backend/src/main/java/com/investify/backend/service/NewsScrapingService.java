//package com.investify.backend.service;
//
//import org.jsoup.Jsoup;
//import org.jsoup.nodes.Document;
//import org.jsoup.nodes.Element;
//import org.springframework.stereotype.Service;
//
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.List;
//
//@Service
//public class NewsScrapingService {
//
//    public List<String> scrapeLatestNews(String assetName) throws IOException {
//        List<String> articles = new ArrayList<>();
//
//        String yahooFinanceUrl = "https://finance.yahoo.com/quote/" + assetName + "/news";
//
//        Document document = Jsoup.connect(yahooFinanceUrl).get();
//
//        for (Element element : document.select("h3 a")) {
//            String title = element.text();
//            String link = "https://finance.yahoo.com" + element.attr("href");
//            articles.add(title + " - " + link);
//        }
//
//        return articles;
//    }
//}

package com.investify.backend.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NewsScrapingService {

    public String fetchHTML(String urlString) throws IOException {
        URL url = new URL(urlString);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");

        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String inputLine;
        StringBuilder content = new StringBuilder();

        while ((inputLine = in.readLine()) != null) {
            content.append(inputLine);
        }

        in.close();
        connection.disconnect();

        return content.toString();
    }

    public List<String> extractNews(String html) {
        List<String> articles = new ArrayList<>();

        String regex = "<h3 class=\"Mb\\(5px\\)\"><a href=\"(.*?)\">(.*?)</a></h3>";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(html);

        while (matcher.find()) {
            String link = matcher.group(1);
            String title = matcher.group(2);

            String fullLink = "https://finance.yahoo.com" + link;
            articles.add(title + " - " + fullLink);
        }

        return articles;
    }
}
