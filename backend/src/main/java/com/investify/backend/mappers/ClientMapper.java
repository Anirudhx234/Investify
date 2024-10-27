package com.investify.backend.mappers;

import com.investify.backend.dtos.ClientDto;
import com.investify.backend.dtos.SignUpDto;
import com.investify.backend.dtos.BasicClientDto;
import com.investify.backend.entities.Client;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ClientMapper {

    @Mapping(target = "id")
    BasicClientDto toBasicClientDto(Client client);

    @Mapping(target = "id")
    BasicClientDto toBasicClientDto(ClientDto clientDto);

    @Mapping(target = "id")
    ClientDto toClientDto(Client client);

    @Mapping(target = "id")
    ClientDto toClientDto(BasicClientDto basicClientDto);

    @Mapping(target = "password", ignore = true)
    Client signUpToClient(SignUpDto signUpDto);
}
