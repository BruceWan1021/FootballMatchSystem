package com.footballmatchsystem.service.impl;

import com.footballmatchsystem.dto.PlayerProfileDTO;
import com.footballmatchsystem.mapper.PlayerProfileMapper;
import com.footballmatchsystem.model.PlayerProfile;
import com.footballmatchsystem.model.User;
import com.footballmatchsystem.repository.PlayerProfileRepository;
import com.footballmatchsystem.repository.UserRepository;
import com.footballmatchsystem.service.PlayerProfileService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlayerProfileServiceImpl implements PlayerProfileService {

    private final PlayerProfileRepository playerProfileRepository;
    private final UserRepository userRepository;

    public PlayerProfileServiceImpl(PlayerProfileRepository playerProfileRepository, UserRepository userRepository) {
        this.playerProfileRepository = playerProfileRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<PlayerProfileDTO> findByTeamId(Long teamId) {
        List<PlayerProfile> profiles = playerProfileRepository.findByTeamId(teamId);
        return profiles.stream()
                .map(PlayerProfileMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void updatePlayerProfile(Long userId, PlayerProfileDTO dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PlayerProfile profile = user.getPlayerProfile();
        if (profile == null) {
            throw new RuntimeException("PlayerProfile not found for user " + userId);
        }

        profile.setNumber(dto.getNumber());
        profile.setPosition(dto.getPosition());
        profile.setHeight(dto.getHeight());
        profile.setWeight(dto.getWeight());

        playerProfileRepository.save(profile);
    }

}
