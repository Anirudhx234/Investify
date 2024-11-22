package com.investify.backend.utils;

import com.investify.backend.entities.Game;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

public class Utils {

    public static LocalDateTime currentUTCTime() {
        return LocalDateTime.now(ZoneOffset.UTC);
    }

    public static boolean isPastGame(LocalDateTime currentTime, Game game) {
        return currentTime.isAfter(game.getEndTime());
    }

    public static boolean isUpcomingGame(LocalDateTime currentTime, Game game) {
        return currentTime.isBefore(game.getStartTime());
    }

    public static boolean isActiveGame(LocalDateTime currentTime, Game game) {
        return currentTime.isAfter(game.getStartTime()) && currentTime.isBefore(game.getEndTime());
    }

}
