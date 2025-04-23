package com.footballmatchsystem.service.impl;

import com.footballmatchsystem.dto.PlayerProfileDTO;
import com.footballmatchsystem.dto.RefereeProfileDTO;
import com.footballmatchsystem.dto.UserDTO;
import com.footballmatchsystem.mapper.UserMapper;
import com.footballmatchsystem.model.*;
import com.footballmatchsystem.repository.TeamRepository;
import com.footballmatchsystem.repository.TournamentRepository;
import com.footballmatchsystem.repository.UserRepository;
import com.footballmatchsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private TournamentRepository tournamentRepository;

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public boolean validateUser(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.isPresent() && user.get().getPassword().equals(password);
    }

    @Override
    public User registerUser(String username, String email, String password) {
        User user = new User(username, email, password);
        return userRepository.save(user);
    }
    @Override
    public Long findUserIdByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"))
                .getId();
    }

    @Override
    public String registerPlayerProfile(String username, PlayerProfileDTO dto) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRoles().contains(User.Role.PLAYER)) {
            return "User is already registered as Player.";
        }

        user.getRoles().add(User.Role.PLAYER);

        PlayerProfile profile = new PlayerProfile();
        profile.setUser(user);
        profile.setPosition(dto.getPosition());
        profile.setNumber(dto.getNumber());
        profile.setHeight(dto.getHeight());
        profile.setWeight(dto.getWeight());

        user.setPlayerProfile(profile);

        userRepository.save(user);

        return "Player profile registered successfully.";
    }

    @Override
    public String registerRefereeProfile(String username, RefereeProfileDTO dto) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRoles().contains(User.Role.REFEREE)) {
            return "User is already registered as Referee.";
        }

        Tournament tournament = tournamentRepository.findById(dto.getTournamentId())
                .orElseThrow(() -> new RuntimeException("Tournament not found"));

        RefereeProfile profile = new RefereeProfile();
        profile.setUser(user);
        profile.setLicenseNumber(dto.getLicenseNumber());
        profile.setTournament(tournament);
        profile.setHeight(dto.getHeight());
        profile.setWeight(dto.getWeight());

        user.setRefereeProfile(profile);
        user.getRoles().add(User.Role.REFEREE);

        userRepository.save(user);

        return "Referee profile registered successfully.";
    }

    @Override
    public UserDTO getCurrentUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));

        return UserMapper.toDto(user);
    }

}
