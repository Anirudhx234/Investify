package com.investify.backend.controllers;

import com.investify.backend.dtos.*;
import com.investify.backend.exceptions.RestException;
import com.investify.backend.services.AuthService;
import com.investify.backend.services.ClientService;
import com.investify.backend.services.EmailService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/clients")
public class ClientController {

    private final AuthService authService;
    private final ClientService clientService;
    private final EmailService emailService;
    @Value("${spring.frontend.url}")
    private String frontendURL;

    @GetMapping("")
    public ResponseEntity<List<BasicClientDto>> getAllClients() {

        List<BasicClientDto> clients = clientService.getAllClients();

        return ResponseEntity.ok(clients);
    }

    @GetMapping("/{clientId}")
    public ResponseEntity<ClientDto> getClient(@PathVariable String clientId) {

        ClientDto client = clientService.getClient(clientId);

        return ResponseEntity.ok(client);
    }

    @PatchMapping("/{clientId}")
    public ResponseEntity<ClientDto> updateClient(@ModelAttribute UpdateProfileDto updateProfileDto, HttpServletResponse response, @PathVariable String clientId) {

        ClientDto updatedClient = clientService.updateProfile(clientId, updateProfileDto);

        Cookie jwtCookie = authService.generateJWTCookie(updatedClient, "jwt");
        response.addCookie(jwtCookie);

        return ResponseEntity.ok(updatedClient);
    }

    @PatchMapping("/{clientId}/email")
    public ResponseEntity<ClientDto> updateEmail(@RequestBody @Valid UpdateEmailDto updateEmailDto, @PathVariable String clientId, HttpServletResponse response) {
        String newEmail = updateEmailDto.getNewEmail();
        ClientDto client = clientService.findDtoById(clientId);

        if (newEmail.equals(client.getEmail())) {
            throw new RestException("New email must be different than current email.", HttpStatus.BAD_REQUEST);
        }

        String verificationToken = UUID.randomUUID().toString();
        String verificationLink = frontendURL + "/verify-email?token=" + verificationToken + "&email=" + updateEmailDto.getNewEmail();
        emailService.sendVerificationEmail(updateEmailDto.getNewEmail(), verificationLink);

        clientService.saveVerificationToken(client.getEmail(), verificationToken);

        return ResponseEntity.ok(client);
    }

    @PostMapping("/{clientId}/create-friend-request")
    public ResponseEntity createFriendRequest(@PathVariable String clientId, @RequestBody FriendRequestDto request) {
        clientService.createFriendRequest(clientId, request);
        return ResponseEntity.ok(new MessageDto("Completed"));
    }

    @PostMapping("/{clientId}/accept-friend-request")
    public ResponseEntity acceptFriendRequest(@PathVariable String clientId, @RequestBody FriendRequestDto request) {
        clientService.acceptFriendRequest(clientId, request);
        return ResponseEntity.ok(new MessageDto("Completed"));
    }

    @PostMapping("/{clientId}/decline-friend-request")
    public ResponseEntity declineFriendRequest(@PathVariable String clientId, @RequestBody FriendRequestDto request) {
        clientService.declineFriendRequest(clientId, request);
        return ResponseEntity.ok(new MessageDto("Completed"));
    }

    @PostMapping("/{clientId}/remove-friend")
    public ResponseEntity removeFriend(@PathVariable String clientId, @RequestBody FriendRequestDto request) {
        clientService.removeFriend(clientId, request);
        return ResponseEntity.ok(new MessageDto("Completed"));
    }

    @DeleteMapping("/{clientId}")
    public ResponseEntity<MessageDto> deleteClient(HttpServletResponse response, @PathVariable String clientId) {
        clientService.deleteClient(clientId);

        Cookie jwtCookie = AuthService.removeJWTCookie("jwt");
        response.addCookie(jwtCookie);

        return ResponseEntity.ok(new MessageDto("Client successfully deleted."));
    }
}

