package com.investify.backend.mappers;

import com.investify.backend.dtos.ClientResponseDto;
import com.investify.backend.dtos.SignUpDto;
import com.investify.backend.dtos.ClientDto;
import com.investify.backend.entities.Client;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ClientMapper {

    ClientDto toClientDto(Client client);

    @Mapping(target = "password", ignore = true)
    Client signUpToClient(SignUpDto signUpDto);

    ClientResponseDto toClientResponseDto(ClientDto clientDto);
}
