package com.investify.backend.config;

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
                    .filter(cookie -> "jwt".equals(cookie.getName())) // Replace 'jwt' with the actual cookie name
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
                    throw e;
                }
            }
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
