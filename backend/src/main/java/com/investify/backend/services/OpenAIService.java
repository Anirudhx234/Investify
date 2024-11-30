package com.investify.backend.services;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.models.ChatCompletions;
import com.azure.ai.openai.models.ChatCompletionsOptions;
import com.azure.ai.openai.models.ChatRequestMessage;
import com.azure.ai.openai.models.ChatRequestSystemMessage;
import com.investify.backend.entities.Client;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OpenAIService {

    private final OpenAIClient openAIClient;

    public OpenAIService(OpenAIClient openAIClient) {
        this.openAIClient = openAIClient;
    }

    public String generateFinancialAdvice(Client client) {
        String prompt = "Generate general financial advice based on the user's details in 150-200 words.";
        String clientDetails = getClientDetails(client);

        List<ChatRequestMessage> chatMessages = new ArrayList<>();
        chatMessages.add(new ChatRequestSystemMessage(prompt));
        chatMessages.add(new ChatRequestSystemMessage(clientDetails));

        ChatCompletionsOptions chatRequest = new ChatCompletionsOptions(chatMessages);
        chatRequest.setMaxTokens(300);

        ChatCompletions result = openAIClient.getChatCompletions("gpt-4o-mini", chatRequest);

        String financialAdvice = result.getChoices().get(0).getMessage().getContent();

        return financialAdvice;
    }

    public String getClientDetails(Client client) {
        return "Age: " + client.getAge() +
                "\nIncome: " + client.getIncome() +
                "\nFinancial goals: " + client.getFinancialGoals() +
                "\nShort term goals: " + client.getShortTermGoal() +
                "\nLong term goals: " + client.getLongTermGoal() +
                "\nLevel of investment risk tolerance: " + client.getInvestmentRisk();
    }
}
