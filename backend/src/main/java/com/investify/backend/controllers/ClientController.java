package com.investify.backend.controllers;

import com.investify.backend.config.ClientAuthenticationProvider;
import com.investify.backend.dtos.*;
import com.investify.backend.entities.Client;
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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/clients")
public class ClientController {

    @Value("${spring.frontend.url}")
    private String frontendURL;

    private final ClientService clientService;
    private final ClientAuthenticationProvider clientAuthenticationProvider;
    private final ClientMapper clientMapper;
    private final EmailService emailService; // Inject EmailService for sending emails

    @GetMapping("/profile")
    public ResponseEntity<ClientProfileDto> getProfile() {

        ClientProfileDto clientProfileDto = (ClientProfileDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return ResponseEntity.ok(clientProfileDto);
    }

    @PatchMapping("/profile")
    public ResponseEntity<MessageDto> modifyProfile(
            @ModelAttribute ModifyProfileDto modifyProfileDto, HttpServletResponse response) {

        ClientProfileDto clientProfileDto = (ClientProfileDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        ClientProfileDto modifiedClientProfileDto = clientService.modifyProfile(clientProfileDto.getEmail(), modifyProfileDto);

        String token = clientAuthenticationProvider.createToken(modifiedClientProfileDto.getEmail());
        Cookie jwtCookie = Utils.generateJWTCookie("jwt", token);
        response.addCookie(jwtCookie);

        return ResponseEntity.ok(new MessageDto("Profile successfully modified."));
    }

    @PatchMapping("/password")
    public ResponseEntity<ClientProfileDto> modifyPassword(
            @RequestBody @Valid ModifyPasswordDto changePasswordDto,
            @RequestParam("token") String token) {

        ClientProfileDto clientProfileDto = clientService.modifyPassword(token, changePasswordDto.getNewPassword());

        return ResponseEntity.ok(clientProfileDto);
    }

    @PatchMapping("/verify-email")
    public ResponseEntity<ClientProfileDto> verifyEmail(
            @RequestParam("newEmail") String newEmail, HttpServletResponse response) {

        ClientProfileDto clientProfileDto = (ClientProfileDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        ClientProfileDto modifiedClientProfileDto = clientService.modifyEmail(clientProfileDto.getEmail(), newEmail);

        String token = clientAuthenticationProvider.createToken(modifiedClientProfileDto.getEmail());
        Cookie jwtCookie = Utils.generateJWTCookie("jwt", token);
        response.addCookie(jwtCookie);

        return ResponseEntity.ok(modifiedClientProfileDto);
    }

    @PatchMapping("/email")
    public ResponseEntity<MessageDto> modifyEmail(
            @RequestBody @Valid ModifyEmailDto modifyEmailDto,
            HttpServletResponse response) {

        String verificationLink = frontendURL + "/verify-new-email?newEmail=" + modifyEmailDto.getNewEmail();
        emailService.sendVerificationEmailForNewEmail(modifyEmailDto.getNewEmail(), verificationLink);

        return ResponseEntity.ok(new MessageDto("Verification for new email sent."));
    }
}

