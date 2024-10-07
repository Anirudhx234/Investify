package com.investify.backend.services;

import com.investify.backend.dtos.CredentialsDto;
import com.investify.backend.dtos.SignUpDto;
import com.investify.backend.dtos.ClientDto;
import com.investify.backend.entities.Client;
import com.investify.backend.exceptions.RestException;
import com.investify.backend.mappers.ClientMapper;
import com.investify.backend.repositories.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;

import java.nio.CharBuffer;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ClientService {

    private final ClientRepository clientRepository;

    private final PasswordEncoder passwordEncoder;

    private final ClientMapper clientMapper;

    public ClientDto login(CredentialsDto credentialsDto) {
        Client client = clientRepository.findByEmail(credentialsDto.getEmail())
                .orElseThrow(() -> new RestException("Unknown client", HttpStatus.NOT_FOUND));

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), client.getPassword())) {
            return clientMapper.toClientDto(client);
        }
        throw new RestException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public ClientDto register(SignUpDto clientDto) {
        Optional<Client> optionalClient = clientRepository.findByEmail(clientDto.getEmail());

        if (optionalClient.isPresent()) {
            throw new RestException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        Client client = clientMapper.signUpToClient(clientDto);
        client.setPassword(passwordEncoder.encode(CharBuffer.wrap(clientDto.getPassword())));

        Client savedClient = clientRepository.save(client);

        return clientMapper.toClientDto(savedClient);
    }

    public ClientDto findByEmail(String email) {
        Client client = clientRepository.findByEmail(email)
                .orElseThrow(() -> new RestException("Unknown client", HttpStatus.NOT_FOUND));
        return clientMapper.toClientDto(client);
    }

}