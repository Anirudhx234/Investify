package com.investify.backend.controllers;

import com.investify.backend.config.ClientAuthenticationProvider;
import com.investify.backend.dtos.*;
import com.investify.backend.mappers.ClientMapper;
import com.investify.backend.services.ClientService;
import com.investify.backend.services.EmailService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final ClientService clientService;
    private final ClientAuthenticationProvider clientAuthenticationProvider;
    private final ClientMapper clientMapper;
    private final EmailService emailService; // Inject EmailService for sending emails

    @PostMapping("/login")
    public ResponseEntity<ClientResponseDto> login(
            @RequestBody @Valid CredentialsDto credentialsDto,
            HttpServletResponse response) {

        ClientDto clientDto = clientService.login(credentialsDto);
        String token = clientAuthenticationProvider.createToken(clientDto.getEmail());

        Cookie jwtCookie = generateJWTCookie("jwt", token);
        response.addCookie(jwtCookie);

        ClientResponseDto clientResponseDto = clientMapper.toClientResponseDto(clientDto);
        return ResponseEntity.ok(clientResponseDto);
    }

    @PostMapping("/signup")
    public ResponseEntity<ClientResponseDto> register(
            @RequestBody @Valid SignUpDto client,
            HttpServletResponse response) {

        ClientDto createdClient = clientService.register(client);

        // Generate a verification token
        String verificationToken = UUID.randomUUID().toString();

        // Send the verification email
        String verificationLink = "http://localhost:3000/verify?token=" + verificationToken;
        emailService.sendVerificationEmail(createdClient.getEmail(), verificationLink);

        // Save the verification token in the database (you will need to implement this)
        clientService.saveVerificationToken(createdClient.getEmail(), verificationToken);

        ClientResponseDto clientResponseDto = clientMapper.toClientResponseDto(createdClient);
        return ResponseEntity.created(URI.create("/clients/" + clientResponseDto.getId()))
                .body(clientResponseDto);
    }

    @GetMapping("/verify")
    public ResponseEntity<MessageDto> verifyEmail(@RequestParam("token") String token) {
        boolean isVerified = clientService.verifyUser(token);

        if (isVerified) {
            return ResponseEntity.ok(new MessageDto("Email verified successfully."));
        } else {
            return ResponseEntity.badRequest().body(new MessageDto("Invalid or expired verification token."));
        }
    }

    public static Cookie generateJWTCookie(String cookieName, String token) {
        Cookie jwtCookie = new Cookie(cookieName, token);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(false);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(3600 * 24 * 7); // Cookie expires in 7 days

        return jwtCookie;
    }
}
