package com.investify.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ScraperService {

    private static final String DUCK_DUCK_GO_SEARCH_URL = "https://html.duckduckgo.com/html";
    private static final int max_results = 20;

    public List<List<String>> getNewsSources(String ticker) {
        List<List<String>> results = new ArrayList<>();
        try {
            String encodedSearchTerm = URLEncoder.encode(ticker, "UTF-8");
            String searchURL = DUCK_DUCK_GO_SEARCH_URL + "?q=" + encodedSearchTerm + "%20stock%20news";
            // System.out.println("Search URL: " + searchURL);

            HttpURLConnection connection = (HttpURLConnection) new URL(searchURL).openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("User-Agent", "Mozilla/5.0");

            int responseCode = connection.getResponseCode();
            // System.out.println("Response Code: " + responseCode);

            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                StringBuilder htmlContent = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    htmlContent.append(line);
                }
                reader.close();


                // System.out.println("Fetched HTML content:");
                // System.out.println(htmlContent.toString());

                Pattern pattern = Pattern.compile("<a rel=\"nofollow\" class=\"result__a\" href=\"([^\"]+)\"[^>]*>(.*?)</a>");
                Matcher matcher = pattern.matcher(htmlContent.toString());

                int resultCount = 0;
                while (matcher.find() && resultCount < max_results) {
                    String url = matcher.group(1).replaceAll("&amp;", "&");
                    String title = matcher.group(2).replaceAll("<[^>]+>", "");
                    //System.out.println("Title: " + title);
                    //System.out.println("URL: " + url);
                    //System.out.println("----------------------");
                    ArrayList<String> source = new ArrayList<>();
                    source.add(title);
                    source.add(url);
                    results.add(source);
                    resultCount++;
                }

                if (resultCount == 0) {

                    System.out.println("No results found. Check the regex pattern or HTML structure.");
                }

            } else {
                System.out.println("Failed to connect. HTTP response code: " + responseCode);
            }

        } catch (Exception e) {
            System.out.println("Error fetching results: " + e.getMessage());
            e.printStackTrace();
        }
        return results;
    }
}