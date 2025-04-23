package com.footballmatchsystem.service;

import com.footballmatchsystem.dto.PlayerProfileDTO;

import java.util.List;

public interface PlayerProfileService  {
    List<PlayerProfileDTO> findByTeamId(Long teamId);

    void updatePlayerProfile(Long userId, PlayerProfileDTO dto);
}
