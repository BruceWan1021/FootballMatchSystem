package com.footballmatchsystem.mapper;

import com.footballmatchsystem.dto.RefereeProfileDTO;
import com.footballmatchsystem.model.RefereeProfile;

public class RefereeProfileMapper {
    public static RefereeProfileDTO toDto(RefereeProfile profile) {
        RefereeProfileDTO dto = new RefereeProfileDTO();
        dto.setLicenseNumber(profile.getLicenseNumber());
        dto.setTournamentId(profile.getTournament().getId());
        dto.setHeight(profile.getHeight());
        dto.setWeight(profile.getWeight());
        return dto;
    }
}

