package com.investify.backend.mappers;

import com.investify.backend.dtos.TradeDto;
import com.investify.backend.entities.Trade;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring")
public interface TradeMapper {

    @Mapping(target = "time", source = "trade.time", qualifiedByName = "localDateTimeToString")
    TradeDto toTradeDto(Trade trade);

    @Named("localDateTimeToString")
    default String localDateTimeToString(LocalDateTime dateTime) {
        // You can adjust the format as needed
        return dateTime != null ? dateTime.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;
    }
}
