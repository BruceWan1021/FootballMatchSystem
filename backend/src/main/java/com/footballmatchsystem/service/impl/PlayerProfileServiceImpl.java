package com.footballmatchsystem.service.impl;

import com.footballmatchsystem.dto.PlayerProfileDTO;
import com.footballmatchsystem.mapper.PlayerProfileMapper;
import com.footballmatchsystem.model.PlayerProfile;
import com.footballmatchsystem.repository.PlayerProfileRepository;
import com.footballmatchsystem.service.PlayerProfileService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlayerProfileServiceImpl implements PlayerProfileService {

    private final PlayerProfileRepository playerProfileRepository;

    public PlayerProfileServiceImpl(PlayerProfileRepository playerProfileRepository) {
        this.playerProfileRepository = playerProfileRepository;
    }

    @Override
    public List<PlayerProfileDTO> findByTeamId(Long teamId) {
        List<PlayerProfile> profiles = playerProfileRepository.findByTeamId(teamId);
        return profiles.stream()
                .map(PlayerProfileMapper::toDto)
                .collect(Collectors.toList());
    }

}
