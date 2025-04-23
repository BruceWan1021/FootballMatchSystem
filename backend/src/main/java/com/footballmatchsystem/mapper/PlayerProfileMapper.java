package com.footballmatchsystem.mapper;

import com.footballmatchsystem.dto.PlayerProfileDTO;
import com.footballmatchsystem.model.PlayerProfile;
import com.footballmatchsystem.model.UserTeamRole;

public class PlayerProfileMapper {

    public static PlayerProfileDTO toDto(PlayerProfile profile) {
        if (profile == null) return null;

        PlayerProfileDTO dto = new PlayerProfileDTO();
        dto.setPosition(profile.getPosition());
        dto.setNumber(profile.getNumber());
        dto.setHeight(profile.getHeight());
        dto.setWeight(profile.getWeight());

        if (profile.getTeam() != null) {
            dto.setTeamId(profile.getTeam().getId());
            dto.setTeamName(profile.getTeam().getName());
        }

        if (profile.getUser() != null) {
            dto.setUserId(profile.getUser().getId());
            dto.setUsername(profile.getUser().getUsername());
            dto.setAvatarUrl(profile.getUser().getAvatarUrl());

        }

        return dto;
    }
}
