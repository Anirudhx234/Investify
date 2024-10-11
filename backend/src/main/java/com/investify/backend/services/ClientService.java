package com.investify.backend.services;

import com.investify.backend.dtos.*;
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

    public ClientProfileDto login(CredentialsDto credentialsDto) {
        Client client = clientRepository.findByEmail(credentialsDto.getEmail())
                .orElseThrow(() -> new RestException("Unknown client", HttpStatus.NOT_FOUND));

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), client.getPassword())) {
            if (!client.isVerified()) {
                throw new RestException("Email not verified. Please check your email for verification.", HttpStatus.FORBIDDEN);
            }
            return clientMapper.toClientProfileDto(client);
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

    public void saveVerificationToken(String email, String token) {
        Optional<Client> clientOpt = clientRepository.findByEmail(email);
        if (clientOpt.isPresent()) {
            Client client = clientOpt.get();
            client.setVerificationToken(token);  // Save the token in the client's entity
            clientRepository.save(client);
        }
    }

    public boolean verifyUser(String token) {
        Optional<Client> clientOpt = clientRepository.findByVerificationToken(token);

        if (clientOpt.isPresent()) {
            Client client = clientOpt.get();
            client.setVerified(true);  // Set the 'verified' flag to true
            client.setVerificationToken(null);  // Clear the verification token after success
            clientRepository.save(client);
            return true;
        }

        return false;  // Token is invalid or user not found
    }


    public ClientProfileDto modifyProfile(String email, ModifyProfileDto modifyProfileDto) {
        Client client = clientRepository.findByEmail(email)
                .orElseThrow(() -> new RestException("Client not found", HttpStatus.NOT_FOUND));

        if (modifyProfileDto.getUsername() != null) {
            client.setUsername(modifyProfileDto.getUsername());
        }

        if (modifyProfileDto.getPassword() != null) {
            String encodedPassword = passwordEncoder.encode(modifyProfileDto.getPassword());
            client.setPassword(encodedPassword);
        }

        if (modifyProfileDto.getProfilePicture() != null) {
            // Save or process the profile picture, then update the client entity
            client.setProfilePicture(modifyProfileDto.getProfilePicture());
        }

        if (modifyProfileDto.getAge() > 0) {
            client.setAge(modifyProfileDto.getAge());
        }

        if (modifyProfileDto.getFinancialGoals() != null) {
            client.setFinancialGoals(modifyProfileDto.getFinancialGoals());
        }

        Client updatedClient = clientRepository.save(client);
        return clientMapper.toClientProfileDto(updatedClient);
    }

    public ClientProfileDto modifyPassword(String token, String newPassword) {
        Client client = clientRepository.findByVerificationToken(token)
                .orElseThrow(() -> new RestException("Client not found", HttpStatus.NOT_FOUND));

        client.setVerificationToken(null);

        client.setPassword(passwordEncoder.encode(newPassword));
        clientRepository.save(client);

        return clientMapper.toClientProfileDto(client);
    }

    public ClientProfileDto modifyEmail(String oldEmail, String newEmail) {
        Client client = clientRepository.findByEmail(oldEmail)
                .orElseThrow(() -> new RestException("Client not found", HttpStatus.NOT_FOUND));

        client.setEmail(newEmail);
        clientRepository.save(client);

        return clientMapper.toClientProfileDto(client);
    }

    public ClientDto findBasicById(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RestException("Unknown client", HttpStatus.NOT_FOUND));
        return clientMapper.toClientDto(client);
    }

    public ClientProfileDto findById(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RestException("Unknown client", HttpStatus.NOT_FOUND));
        return clientMapper.toClientProfileDto(client);
    }

    public ClientProfileDto findByEmail(String email) {
        Client client = clientRepository.findByEmail(email)
                .orElseThrow(() -> new RestException("Unknown client", HttpStatus.NOT_FOUND));
        return clientMapper.toClientProfileDto(client);
    }

    public ClientProfileDto findByVerificationToken(String token) {
        Client client = clientRepository.findByVerificationToken(token)
                .orElseThrow(() -> new RestException("Unknown client", HttpStatus.NOT_FOUND));
        return clientMapper.toClientProfileDto(client);
    }

}