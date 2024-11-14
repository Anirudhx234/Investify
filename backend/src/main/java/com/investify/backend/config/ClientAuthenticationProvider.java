package com.investify.backend.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import com.investify.backend.dtos.ClientDto;
import com.investify.backend.entities.Client;
import com.investify.backend.exceptions.RestException;
import com.investify.backend.mappers.ClientMapper;
import com.investify.backend.repositories.ClientRepository;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.*;

@RequiredArgsConstructor
@Component
public class ClientAuthenticationProvider {

    private final ClientRepository clientRepository;

    private final ClientMapper clientMapper;

    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    @PostConstruct
    protected void init() {
        // this is to avoid having the raw secret key available in the JVM
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(String clientId) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + 3600000); // 1 hour

        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        return JWT.create()
                .withSubject(clientId)
                .withSubject(clientId)
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .sign(algorithm);
    }

    @Transactional
    public Authentication validateToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        JWTVerifier verifier = JWT.require(algorithm)
                .build();

        DecodedJWT decoded = verifier.verify(token);

        Client entity = clientRepository.findById(UUID.fromString(decoded.getSubject()))
                .orElseThrow(() -> new RestException("Unknown client", HttpStatus.NOT_FOUND));

        ClientDto client = clientMapper.toClientDto(entity);

        return new UsernamePasswordAuthenticationToken(client, null, Collections.emptyList());
    }

}
