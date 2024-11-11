package com.investify.backend.services;

import com.investify.backend.entities.Game;
import com.investify.backend.repositories.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Random;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    private ClientRepository clientRepository;

    @Autowired
    private JavaMailSender mailSender;

    private String generateGameCode() {
        return String.valueOf(new Random().nextInt(900000) + 100000); // 6-digit code
    }

    @Transactional
    public String createGame(String creator, String parameters) {
        String gameCode = generateGameCode();

        Game game = new Game();
        game.setGameCode(gameCode);
        game.setCreator(creator);
        game.setParameters(parameters);

        gameRepository.save(game);
        return gameCode;
    }

    public void sendGameCodeByEmail(String email, String gameCode) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Game Invitation Code");
        message.setText("Use the game code: " + gameCode + " to join the game.");

        mailSender.send(message);
    }

    public boolean addClientToGame(String invitationCode, UUID clientId) {
        Optional<Game> gameOpt = gameRepository.findByInvitationCode(invitationCode);
        if (gameOpt.isPresent()) {
            Game game = gameOpt.get();
            Client client = clientRepository.findById(clientId)
                    .orElseThrow(() -> new EntityNotFoundException("Client not found"));

            // Logic to add the client to the game
            game.addParticipant(client);
            gameRepository.save(game);
            return true;
        }
        return false;
    }
}
