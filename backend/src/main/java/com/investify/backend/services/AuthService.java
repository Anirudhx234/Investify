package com.investify.backend.services;

import com.investify.backend.config.ClientAuthenticationProvider;
import com.investify.backend.dtos.ClientDto;
import com.investify.backend.dtos.CredentialsDto;
import com.investify.backend.entities.Client;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


@RequiredArgsConstructor
@Service
public class AuthService {
    private final ClientAuthenticationProvider clientAuthenticationProvider;

    public Client getLoggedInClient() {
        return (Client) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public Cookie generateJWTCookie(ClientDto client, String cookieName) {
        String token = clientAuthenticationProvider.createToken(client.getId());
        Cookie jwtCookie = new Cookie(cookieName, token);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(false);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(3600 * 24 * 7); // Cookie expires in 7 days

        return jwtCookie;
    }

    public static Cookie removeJWTCookie(String cookieName) {
        Cookie jwtCookie = new Cookie(cookieName, null);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(false);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(0);

        return jwtCookie;
    }
}
