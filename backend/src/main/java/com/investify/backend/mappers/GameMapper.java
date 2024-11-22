package com.investify.backend.mappers;

import com.investify.backend.dtos.GameDto;
import com.investify.backend.entities.Game;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring")
public interface GameMapper {

    @Mapping(target = "startTime", source = "game.startTime", qualifiedByName = "localDateTimeToString")
    @Mapping(target = "endTime", source = "game.endTime", qualifiedByName = "localDateTimeToString")
    @Mapping(target = "mode", source = "game.mode") // Explicitly map "game.mode" to "mode"
    GameDto toGameDto(Game game);

    @Named("localDateTimeToString")
    default String localDateTimeToString(LocalDateTime dateTime) {
        // You can adjust the format as needed
        return dateTime != null ? dateTime.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;
    }
}
