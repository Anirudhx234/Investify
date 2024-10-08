package com.investify.backend.controllers;

import com.investify.backend.config.ClientAuthenticationProvider;
import com.investify.backend.dtos.ClientResponseDto;
import com.investify.backend.dtos.CredentialsDto;
import com.investify.backend.dtos.SignUpDto;
import com.investify.backend.dtos.ClientDto;
import com.investify.backend.mappers.ClientMapper;
import com.investify.backend.services.ClientService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final ClientService clientService;
    private final ClientAuthenticationProvider clientAuthenticationProvider;
    private final ClientMapper clientMapper;

    @PostMapping("/api/login")
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

    @PostMapping("/api/signup")
    public ResponseEntity<ClientResponseDto> register(
            @RequestBody @Valid SignUpDto client,
            HttpServletResponse response) {

        ClientDto createdClient = clientService.register(client);
        String token = clientAuthenticationProvider.createToken(createdClient.getEmail());

        Cookie jwtCookie = generateJWTCookie("jwt", token);
        response.addCookie(jwtCookie);

        ClientResponseDto clientResponseDto = clientMapper.toClientResponseDto(createdClient);
        return ResponseEntity.created(URI.create("/clients/" + clientResponseDto.getId()))
                .body(clientResponseDto);
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
