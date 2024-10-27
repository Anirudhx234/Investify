package com.investify.backend.controllers;

import com.investify.backend.dtos.*;
import com.investify.backend.mappers.ClientMapper;
import com.investify.backend.services.AuthService;
import com.investify.backend.services.ClientService;
import com.investify.backend.services.EmailService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Value("${spring.frontend.url}")
    private String frontendURL;

    private final AuthService authService;
    private final ClientService clientService;
    private final ClientMapper clientMapper;
    private final EmailService emailService;

    @PostMapping("/login")
    public ResponseEntity<ClientDto> login(
            @RequestBody @Valid CredentialsDto credentialsDto,
            HttpServletResponse response) {

        ClientDto client = clientService.login(credentialsDto);

        Cookie jwtCookie = authService.generateJWTCookie(client, "jwt");
        response.addCookie(jwtCookie);

        return ResponseEntity.ok(client);
    }

    @PostMapping("/signup")
    public ResponseEntity<ClientDto> signup(
            @RequestBody @Valid SignUpDto signUpDto,
            HttpServletResponse response) {

        ClientDto newClient = clientService.signup(signUpDto);

        String verificationToken = UUID.randomUUID().toString();
        String verificationLink = frontendURL + "/verify-email?token=" + verificationToken + "&email=" + newClient.getEmail();
        emailService.sendVerificationEmail(newClient.getEmail(), verificationLink);

        clientService.saveVerificationToken(newClient.getEmail(), verificationToken);

        return ResponseEntity.ok(newClient);
    }

    @GetMapping("/verify-email")
    public ResponseEntity<ClientDto> verifyEmail(@RequestParam("token") String token, @RequestParam("email") String email) {
        return ResponseEntity.ok(clientService.verifyClient(token, email));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<MessageDto> forgotPassword(
            @RequestBody @Valid ForgotPasswordDto forgotPasswordDto,
            HttpServletResponse response) {

        String clientEmail = forgotPasswordDto.getEmail();

        String verificationToken = UUID.randomUUID().toString();
        clientService.saveVerificationToken(clientEmail, verificationToken);

        String resetPasswordLink = frontendURL + "/reset-password?token=" + verificationToken;
        emailService.sendResetPasswordEmail(clientEmail, resetPasswordLink);

        return ResponseEntity.ok(new MessageDto("Reset password email sent."));
    }

    @PatchMapping("/reset-password")
    public ResponseEntity<ClientDto> updatePassword(@RequestBody @Valid ResetPasswordDto resetPasswordDto, @RequestParam("token") String token) {

        ClientDto client = clientService.updatePassword(token, resetPasswordDto.getNewPassword());

        return ResponseEntity.ok(client);
    }

    @PostMapping("/logout")
    public ResponseEntity<MessageDto> logout(HttpServletResponse response) {
        Cookie jwtCookie = AuthService.removeJWTCookie("jwt");
        response.addCookie(jwtCookie);

        return ResponseEntity.ok(new MessageDto("Logged out successfully."));
    }
}
