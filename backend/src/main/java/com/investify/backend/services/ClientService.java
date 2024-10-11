package com.investify.backend.services;

import com.investify.backend.dtos.*;
import com.investify.backend.entities.Client;
import com.investify.backend.exceptions.RestException;
import com.investify.backend.mappers.ClientMapper;
import com.investify.backend.repositories.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.CharBuffer;
import java.util.Base64;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ClientService {

    private final ClientRepository clientRepository;

    private final PasswordEncoder passwordEncoder;

    private final ClientMapper clientMapper;

    @Autowired
    S3Service s3Service;

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
        Optional<Client> optionalClient1 = clientRepository.findByUsername(clientDto.getUsername());

        if (optionalClient1.isPresent()) {
            throw new RestException("Username already exists", HttpStatus.BAD_REQUEST);
        }

        Optional<Client> optionalClient = clientRepository.findByEmail(clientDto.getEmail());

        if (optionalClient.isPresent()) {
            throw new RestException("Email already exists", HttpStatus.BAD_REQUEST);
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
            Optional<Client> optionalClient1 = clientRepository.findByUsername(modifyProfileDto.getUsername());
            if (optionalClient1.isPresent()) {
                throw new RestException("Username already exists", HttpStatus.BAD_REQUEST);
            }
            client.setUsername(modifyProfileDto.getUsername());
        }

        if (modifyProfileDto.getPassword() != null) {
            String encodedPassword = passwordEncoder.encode(modifyProfileDto.getPassword());
            client.setPassword(encodedPassword);
        }

        if (modifyProfileDto.getProfilePicture() != null) {
            try {
                String s3FilePath = s3Service.uploadFile(modifyProfileDto.getProfilePicture());
                client.setProfilePicture(s3FilePath);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        if (modifyProfileDto.getAge() > 0) {
            client.setAge(modifyProfileDto.getAge());
        }

        if (modifyProfileDto.getIncome() != null && modifyProfileDto.getIncome() > 0.0) {
            client.setIncome(modifyProfileDto.getIncome());
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

    public ClientProfileDto deleteClient(String email) {
        Client client = clientRepository.findByEmail(email)
                .orElseThrow(() -> new RestException("Client not found", HttpStatus.NOT_FOUND));

        clientRepository.delete(client);

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