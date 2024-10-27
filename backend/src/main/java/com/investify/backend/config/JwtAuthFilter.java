package com.investify.backend.config;

import com.investify.backend.services.AuthService;
import com.investify.backend.utils.Utils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final ClientAuthenticationProvider clientAuthenticationProvider;

    @Override
    protected void doFilterInternal(
            HttpServletRequest httpServletRequest,
            HttpServletResponse httpServletResponse,
            FilterChain filterChain) throws ServletException, IOException {

        // Get JWT from cookies
        Cookie[] cookies = httpServletRequest.getCookies();
        if (cookies != null) {
            Cookie jwtCookie = Arrays.stream(cookies)
                    .filter(cookie -> "jwt".equals(cookie.getName()))
                    .findFirst()
                    .orElse(null);

            if (jwtCookie != null) {
                String token = jwtCookie.getValue();
                try {
                    // Validate the token and set the authentication context
                    SecurityContextHolder.getContext().setAuthentication(
                            clientAuthenticationProvider.validateToken(token));
                } catch (RuntimeException e) {
                    SecurityContextHolder.clearContext();
                    System.out.println(e);
                    jwtCookie = AuthService.removeJWTCookie("jwt");
                    httpServletResponse.addCookie(jwtCookie);
                }
            }
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
