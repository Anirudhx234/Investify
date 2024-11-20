package com.investify.backend.services;

import com.investify.backend.dtos.CreateGameDto;
import com.investify.backend.dtos.GameDto;
import com.investify.backend.dtos.GamePortfolioListDto;
import com.investify.backend.dtos.LeaderboardPositionDto;
import com.investify.backend.entities.*;
import com.investify.backend.exceptions.RestException;
import com.investify.backend.mappers.ClientMapper;
import com.investify.backend.mappers.GameMapper;
import com.investify.backend.repositories.BadgeRepository;
import com.investify.backend.repositories.ClientRepository;
import com.investify.backend.repositories.GamePortfolioRepository;
import com.investify.backend.repositories.GameRepository;
import com.investify.backend.utils.Utils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Transactional
@Service
public class GameService {

    private final GameRepository gameRepository;

    private final GamePortfolioRepository gamePortfolioRepository;

    private final BadgeRepository badgeRepository;

    private final GameMapper gameMapper;

    private final ClientMapper clientMapper;

    private final ClientService clientService;

    private final PortfolioService portfolioService;

    private final ClientRepository clientRepository;

    public GameDto createGame(String clientId, CreateGameDto request) {
        Client client = clientService.findById(clientId); // Keep this for now

        LocalDateTime startTime = request.getStartTime();
        LocalDateTime endTime = request.getEndTime();

        if (startTime.isAfter(endTime)) {
            throw new RestException("Start time must be before end time", HttpStatus.BAD_REQUEST);
        }

        if (request.getBuyingPower() < 0) {
            throw new RestException("Buying power must be positive", HttpStatus.BAD_REQUEST);
        }

        Game game = new Game(request.getName(), startTime, endTime, request.getBuyingPower());
        gameRepository.save(game);

        joinGame(clientId, game.getId());

        return gameMapper.toGameDto(game);
    }

    public Map<String, List<GamePortfolioListDto>> getClientGamePortfolios(String clientId) {
        Client client = clientService.findById(clientId);

        List<GamePortfolio> gamePortfolios = client.getGamePortfolios();

        LocalDateTime currentTime = LocalDateTime.now();

        List<GamePortfolioListDto> activeGames = gamePortfolios.stream()
                .filter(portfolio -> Utils.isActiveGame(currentTime, portfolio.getGame()))
                .map(this::toGamePortfolioListDto)
                .toList();

        List<GamePortfolioListDto> pastGames = gamePortfolios.stream()
                .filter(portfolio -> Utils.isPastGame(currentTime, portfolio.getGame()))
                .map(this::toGamePortfolioListDto)
                .toList();

        List<GamePortfolioListDto> upcomingGames = gamePortfolios.stream()
                .filter(portfolio -> Utils.isUpcomingGame(currentTime, portfolio.getGame()))
                .map(this::toGamePortfolioListDto)
                .toList();

        return Map.of(
                "activeGames", activeGames,
                "pastGames", pastGames,
                "upcomingGames", upcomingGames
        );
    }

    public Map<String, List<GameDto>> getAvailableGamesToJoin(String clientId) {
        Client client = clientService.findById(clientId);

        List<GamePortfolio> gamePortfolios = client.getGamePortfolios();

        List<UUID> joinedGameIds = gamePortfolios.stream()
                .map(portfolio -> portfolio.getGame().getId())
                .toList();

        LocalDateTime currentTime = LocalDateTime.now();  // Using LocalDateTime

        // Filter all games into upcomingGames and activeGames, excluding games the client has already joined
        List<Game> allAvailableGames = gameRepository.findAll().stream()
                .filter(game -> !joinedGameIds.contains(game.getId()))
                .toList();

        List<GameDto> activeGames = allAvailableGames.stream()
                .filter(game -> Utils.isActiveGame(currentTime, game))
                .map(gameMapper::toGameDto)
                .toList();

        List<GameDto> upcomingGames = allAvailableGames.stream()
                .filter(game -> Utils.isUpcomingGame(currentTime, game))
                .map(gameMapper::toGameDto)
                .toList();

        return Map.of(
                "activeGames", activeGames,
                "upcomingGames", upcomingGames
        );
    }

    public GameDto joinGame(String clientId, UUID gameId) {
        Client client = clientService.findById(clientId);

        Optional<GamePortfolio> gamePortfolio = gamePortfolioRepository.findByClientAndGameId(client, gameId);
        if (gamePortfolio.isPresent()) {
            throw new RestException("Client has already joined game", HttpStatus.FORBIDDEN);
        }

        Game game = findById(gameId);

        GamePortfolio portfolio = new GamePortfolio(client, game);
        gamePortfolioRepository.save(portfolio);

        return gameMapper.toGameDto(game);
    }

    public List<LeaderboardPositionDto> getLeaderboard(UUID gameId) {
        Game game = findById(gameId);

        return game.getGamePortfolios().stream()
                .map(portfolio ->
                        new LeaderboardPositionDto(clientMapper.toBasicClientDto(portfolio.getClient()),
                        portfolioService.getTotalPortfolioValue(portfolio.getId()) + portfolio.getBuyingPower()))
                .sorted((dto1, dto2) -> Double.compare(dto2.getTotalValue(), dto1.getTotalValue()))
                .toList();
    }

    @Scheduled(fixedRate = 10000)
    public void checkGameEndTimes() {
        List<Game> activeGames = gameRepository.findAll();
        LocalDateTime currentTime = LocalDateTime.now();

        activeGames.stream()
                .filter(game -> !game.isProcessed() && currentTime.isAfter(game.getEndTime()))
                .forEach(this::handleGameEnd);
    }

    public void handleGameEnd(Game game) {
        List<Client> participants = game.getGamePortfolios().stream()
                .map(Portfolio::getClient)
                .toList();

        List<LeaderboardPositionDto> leaderboard = getLeaderboard(game.getId());

        ParticipationBadge participationBadge = new ParticipationBadge(game);
        badgeRepository.save(participationBadge);

        for (Client client : participants) {
            participationBadge.getClients().add(client);
            client.getBadges().add(participationBadge);
            clientRepository.save(client);
        }

        int rank = 0;
        double previousValue = -1;
        for (LeaderboardPositionDto position : leaderboard) {
            Client client = clientService.findById(position.getClient().getId());

            double currentValue = position.getTotalValue();
            if (currentValue != previousValue) {
                rank++;
            }
            previousValue = currentValue;

            RankBadge rankBadge = new RankBadge(rank, game, client);
            badgeRepository.save(rankBadge);

            rankBadge.getClients().add(client);
            client.getBadges().add(rankBadge);
            clientRepository.save(client);
        }

        game.setProcessed(true);
        gameRepository.save(game);
    }

    public Game findById(UUID gameId) {
        return gameRepository.findById(gameId)
                .orElseThrow(() -> new RestException("Unknown game", HttpStatus.NOT_FOUND));
    }

    private GamePortfolioListDto toGamePortfolioListDto(GamePortfolio portfolio) {
        GamePortfolioListDto dto = new GamePortfolioListDto();
        dto.setId(portfolio.getId());
        dto.setName(portfolio.getName());
        dto.setGame(gameMapper.toGameDto(portfolio.getGame()));
        return dto;
    }
}