package com.investify.backend.utils;

import com.investify.backend.entities.Game;

import java.time.LocalDateTime;

public class Utils {

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
