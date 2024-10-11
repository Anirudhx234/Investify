package com.investify.backend.mappers;

import com.investify.backend.dtos.ClientProfileDto;
import com.investify.backend.dtos.SignUpDto;
import com.investify.backend.dtos.ClientDto;
import com.investify.backend.entities.Client;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ClientMapper {

    @Mapping(target = "email")
    ClientDto toClientDto(Client client);

    @Mapping(target = "email")
    ClientProfileDto toClientProfileDto(Client client);

    @Mapping(target = "password", ignore = true)
    Client signUpToClient(SignUpDto signUpDto);

    @Mapping(target = "email")
    ClientProfileDto toClientProfileDto(ClientDto clientDto);
}
