package com.investify.backend.services;

import com.investify.backend.dtos.*;
import com.investify.backend.entities.Client;
import com.investify.backend.enums.InvestmentRisk;
import com.investify.backend.exceptions.RestException;
import com.investify.backend.mappers.BadgeMapper;
import com.investify.backend.mappers.ClientMapper;
import com.investify.backend.repositories.ClientRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.CharBuffer;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Transactional
@Service
public class ClientService {

    private final AuthService authService;

    private final ClientRepository clientRepository;

    private final PasswordEncoder passwordEncoder;

    private final ClientMapper clientMapper;

    private final BadgeMapper badgeMapper;

    @Autowired
    S3Service s3Service;

    public ClientDto login(CredentialsDto credentialsDto) {
        Client client = findByEmail(credentialsDto.getEmail());

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), client.getPassword())) {
            //if (!client.isVerified()) {
            //    throw new RestException("Email not verified. Please check your email for verification.", HttpStatus.FORBIDDEN);
            //}
            return clientMapper.toClientDto(client);
        }

        throw new RestException("Invalid password", HttpStatus.BAD_REQUEST);
    }


    public ClientDto signup(SignUpDto clientDto) {
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
        client.setInvestmentRisk(InvestmentRisk.LOW);

        Client savedClient = clientRepository.save(client);

        return clientMapper.toClientDto(savedClient);
    }

    public void saveVerificationToken(String email, String token) {
        Client client = findByEmail(email);

        client.setVerificationToken(token);
        clientRepository.save(client);
    }

    public ClientDto verifyClient(String token, String email) {
        Optional<Client> clientOpt = clientRepository.findByVerificationToken(token);

        if (clientOpt.isPresent()) {
            Client client = clientOpt.get();
            client.setVerified(true);  // Set the 'verified' flag to true
            client.setVerificationToken(null);  // Clear the verification token after success
            client.setEmail(email);
            clientRepository.save(client);
            return clientMapper.toClientDto(client);
        }
        throw new RestException("Token is invalid or client not found", HttpStatus.BAD_REQUEST);
    }

    public List<BasicClientDto> getAllClients() {
        return clientRepository.findAll().stream()
                .map(clientMapper::toBasicClientDto)
                .toList();
    }

    public ClientDto getClient(String clientId) {
        return findDtoById(clientId);
    }

    public ClientDto updateProfile(String clientId, UpdateProfileDto updateProfileDto) {
        Client client = findById(clientId);

        if (updateProfileDto.getUsername() != null) {
            client.setUsername(updateProfileDto.getUsername());
        }

        if (updateProfileDto.getPassword() != null) {
            String encodedPassword = passwordEncoder.encode(updateProfileDto.getPassword());
            client.setPassword(encodedPassword);
        }

        if (updateProfileDto.getProfilePicture() != null) {
            try {
                String s3FilePath = s3Service.uploadFile(updateProfileDto.getProfilePicture());
                client.setProfilePicture(s3FilePath);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        if (updateProfileDto.getAge() != null && updateProfileDto.getAge() > 0) {
            client.setAge(updateProfileDto.getAge());
        }

        if (updateProfileDto.getIncome() != null && updateProfileDto.getIncome() > 0.0) {
            client.setIncome(updateProfileDto.getIncome());
        }

        if (updateProfileDto.getFinancialGoals() != null) {
            client.setFinancialGoals(updateProfileDto.getFinancialGoals());
        }

        if (updateProfileDto.getShortTermGoal() != null){
            client.setShortTermGoal(updateProfileDto.getShortTermGoal());
        }

        if (updateProfileDto.getLongTermGoal() != null){
            client.setLongTermGoal(updateProfileDto.getLongTermGoal());
        }

        if (updateProfileDto.getInvestmentRisk() != null){
            client.setInvestmentRisk(updateProfileDto.getInvestmentRisk());
        }

        if (updateProfileDto.getUserSavings() != null){
            client.setUserSavings(updateProfileDto.getUserSavings());
        }

        if (updateProfileDto.getCurrentSavings() != null){
            client.setCurrentSavings(updateProfileDto.getCurrentSavings());
        }

        Client updatedClient = clientRepository.save(client);
        return clientMapper.toClientDto(updatedClient);
    }

    public ClientDto updatePassword(String token, String newPassword) {
        Client client = findByVerificationToken(token);

        client.setVerificationToken(null);

        client.setPassword(passwordEncoder.encode(newPassword));
        clientRepository.save(client);

        return clientMapper.toClientDto(client);
    }

    public void createFriendRequest(String clientId, FriendRequestDto request) {
        Client client = findById(clientId);
        Client friend = findById(String.valueOf(request.getFriendId()));

        if (!client.getFriends().contains(friend) && !friend.getFriendRequests().contains(client)) {
            friend.getFriendRequests().add(client);
            clientRepository.save(friend);
        }
    }

    public void acceptFriendRequest(String clientId, FriendRequestDto request) {
        Client client = findById(clientId);
        Client friend = findById(String.valueOf(request.getFriendId()));

        if (!client.getFriendRequests().contains(friend)) {
            throw new RestException("No friend request found", HttpStatus.NOT_FOUND);
        }

        client.getFriendRequests().remove(friend);
        client.getFriends().add(friend);
        friend.getFriends().add(client);

        clientRepository.save(client);
        clientRepository.save(friend);
    }

    public void declineFriendRequest(String clientId, FriendRequestDto request) {
        Client client = findById(clientId);
        Client friend = findById(String.valueOf(request.getFriendId()));

        if (!client.getFriendRequests().contains(friend)) {
            throw new RestException("No friend request found", HttpStatus.NOT_FOUND);
        }

        client.getFriendRequests().remove(friend);

        clientRepository.save(client);
    }

    public void removeFriend(String clientId, FriendRequestDto request) {
        Client client = findById(clientId);
        Client friend = findById(String.valueOf(request.getFriendId()));

        if (!client.getFriends().contains(friend)) {
            throw new RestException("Friend not found", HttpStatus.NOT_FOUND);
        }

        client.getFriends().remove(friend);
        friend.getFriends().remove(client);

        clientRepository.save(client);
        clientRepository.save(friend);
    }

    public ClientDto deleteClient(String clientId) {
        Client client = findById(clientId);

        clientRepository.delete(client);

        return clientMapper.toClientDto(client);
    }

    public BasicClientDto findBasicDtoById(String clientId) {
        return clientMapper.toBasicClientDto(findById(clientId));
    }

    public ClientDto findDtoById(String clientId) {
        Client client = findById(clientId);

        List<BadgeDto> badgeDtos = client.getBadges().stream()
                .map(badgeMapper::toBadgeDto)
                .toList();

        List<BasicClientDto> friends = client.getFriends().stream()
                .map(clientMapper::toBasicClientDto)
                .toList();

        List<BasicClientDto> friendRequests = client.getFriendRequests().stream()
                .map(clientMapper::toBasicClientDto)
                .toList();

        ClientDto clientDto = clientMapper.toClientDto(client);
        clientDto.setBadges(badgeDtos);
        clientDto.setFriends(friends);
        clientDto.setFriendRequests(friendRequests);

        return clientDto;
    }

    public Client findById(String clientId) {
        if ("me".equals(clientId)) {
            clientId = authService.getLoggedInClient().getId(); // TODO: Return logged in client directly (fix lazy loading issue)
        }
        return clientRepository.findById(UUID.fromString(clientId))
                .orElseThrow(() -> new RestException("Unknown client", HttpStatus.NOT_FOUND));
    }

    private Client findByEmail(String email) {
        return clientRepository.findByEmail(email)
                .orElseThrow(() -> new RestException("Unknown client", HttpStatus.NOT_FOUND));
    }

    private Client findByVerificationToken(String token) {
        return clientRepository.findByVerificationToken(token)
                .orElseThrow(() -> new RestException("Unknown client", HttpStatus.NOT_FOUND));
    }

}