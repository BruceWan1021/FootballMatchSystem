package com.footballmatchsystem.mapper;

import com.footballmatchsystem.dto.PlayerProfileDTO;
import com.footballmatchsystem.model.PlayerProfile;

public class PlayerProfileMapper {
    public static PlayerProfileDTO toDto(PlayerProfile profile) {
        PlayerProfileDTO dto = new PlayerProfileDTO();
        dto.setPosition(profile.getPosition());
        dto.setNumber(profile.getNumber());
        dto.setHeight(profile.getHeight());
        dto.setWeight(profile.getWeight());

        dto.setTeamId(profile.getId() != null ? profile.getId() : null );
        return dto;
    }
}
