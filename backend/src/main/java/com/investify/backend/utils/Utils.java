package com.investify.backend.utils;

import jakarta.servlet.http.Cookie;

public class Utils {

    public static Cookie generateJWTCookie(String cookieName, String token) {
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
