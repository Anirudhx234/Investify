package com.investify.backend.controllers;

import com.investify.backend.dtos.*;
import com.investify.backend.services.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/games")
public class GameController {

    private final GameService gameService;

    @PostMapping("/clients/{clientId}")
    public ResponseEntity createGame(@PathVariable String clientId, @RequestBody CreateGameDto request) {
        System.out.println("Request received for clientId: " + clientId);
        System.out.println("Request body: " + request);
        GameDto game = gameService.createGame(clientId, request);
        return ResponseEntity.ok(game);
    }

    @GetMapping("/clients/{clientId}")
    public ResponseEntity getGamePortfolios(@PathVariable String clientId) {
        Map<String, List<GamePortfolioListDto>> games = gameService.getGamePortfolios(clientId);
        return ResponseEntity.ok(games);
    }

    @GetMapping("/{gameId}/clients/{clientId}")
    public ResponseEntity getGamePortfolio(@PathVariable UUID gameId, @PathVariable String clientId) {
        GamePortfolioListDto gamePortfolio = gameService.getGamePortfolio(gameId, clientId);
        return ResponseEntity.ok(gamePortfolio);
    }

    @GetMapping("/clients/{clientId}/available-games")
    public ResponseEntity getAvailableGamesToJoin(@PathVariable String clientId) {
        Map<String, List<GameDto>> games = gameService.getAvailableGamesToJoin(clientId);
        return ResponseEntity.ok(games);
    }

    @PostMapping("/{gameId}/clients/{clientId}/join")
    public ResponseEntity joinGame(@PathVariable UUID gameId, @PathVariable String clientId) {
        GamePortfolioListDto gamePortfolio = gameService.joinGame(clientId, gameId);
        return ResponseEntity.ok(gamePortfolio);
    }

    @GetMapping("/{gameId}/leaderboard")
    public ResponseEntity<List<LeaderboardPositionDto>> getLeaderboard(@PathVariable UUID gameId) {
        List<LeaderboardPositionDto> leaderboard = gameService.getLeaderboard(gameId);
        return ResponseEntity.ok(leaderboard);
    }
}
