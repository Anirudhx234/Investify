package com.investify.backend.controllers;

import com.investify.backend.config.ClientAuthenticationProvider;
import com.investify.backend.dtos.*;
import com.investify.backend.mappers.ClientMapper;
import com.investify.backend.services.ClientService;
import com.investify.backend.services.EmailService;
import com.investify.backend.utils.Utils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${spring.frontend.url}")
    private String frontendURL;

    private final ClientService clientService;
    private final ClientAuthenticationProvider clientAuthenticationProvider;
    private final ClientMapper clientMapper;
    private final EmailService emailService; // Inject EmailService for sending emails

    @PostMapping("/login")
    public ResponseEntity<ClientProfileDto> login(
            @RequestBody @Valid CredentialsDto credentialsDto,
            HttpServletResponse response) {

        ClientProfileDto clientProfileDto = clientService.login(credentialsDto);
        String token = clientAuthenticationProvider.createToken(clientProfileDto.getEmail());

        Cookie jwtCookie = Utils.generateJWTCookie("jwt", token);
        response.addCookie(jwtCookie);

        return ResponseEntity.ok(clientProfileDto);
    }

    @PostMapping("/signup")
    public ResponseEntity<ClientProfileDto> register(
            @RequestBody @Valid SignUpDto client,
            HttpServletResponse response) {

        ClientDto createdClient = clientService.register(client);

        String verificationToken = UUID.randomUUID().toString();
        String verificationLink = frontendURL + "/verify-email?token=" + verificationToken;
        emailService.sendVerificationEmail(createdClient.getEmail(), verificationLink);

        clientService.saveVerificationToken(createdClient.getEmail(), verificationToken);

        ClientProfileDto clientProfileDto = clientMapper.toClientProfileDto(createdClient);
        return ResponseEntity.ok(clientProfileDto);
    }

    @GetMapping("/verify-email")
    public ResponseEntity<MessageDto> verifyEmail(@RequestParam("token") String token) {
        boolean isVerified = clientService.verifyUser(token);

        if (isVerified) {
            return ResponseEntity.ok(new MessageDto("Email verified successfully."));
        } else {
            return ResponseEntity.badRequest().body(new MessageDto("Invalid or expired verification token."));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<MessageDto> resetPassword(
            @RequestBody @Valid ResetPasswordDto resetPasswordDto,
            HttpServletResponse response) {

        ClientProfileDto clientProfileDto = clientService.findByEmail(resetPasswordDto.getEmail());

        String verificationToken = UUID.randomUUID().toString();
        String resetPasswordLink = frontendURL + "/reset-password?token=" + verificationToken;
        emailService.sendResetPasswordEmail(clientProfileDto.getEmail(), resetPasswordLink);

        clientService.saveVerificationToken(clientProfileDto.getEmail(), verificationToken);

        return ResponseEntity.ok(new MessageDto("Reset password email sent."));
    }

    @PostMapping("/logout")
    public ResponseEntity<MessageDto> logout(HttpServletResponse response) {
        Cookie jwtCookie = Utils.removeJWTCookie("jwt");
        response.addCookie(jwtCookie);

        return ResponseEntity.ok(new MessageDto("Logged out successfully."));
    }
}
