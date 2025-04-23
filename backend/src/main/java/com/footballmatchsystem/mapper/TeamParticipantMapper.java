package com.footballmatchsystem.mapper;

import com.footballmatchsystem.dto.PlayerProfileDTO;
import com.footballmatchsystem.dto.TeamDTO;
import com.footballmatchsystem.dto.TeamParticipantDTO;
import com.footballmatchsystem.model.PlayerProfile;
import com.footballmatchsystem.model.Team;
import com.footballmatchsystem.model.TeamParticipant;
import com.footballmatchsystem.model.User;

public class TeamParticipantMapper {

    public static TeamParticipantDTO toDTO(TeamParticipant participant) {
        if (participant == null) return null;

        TeamParticipantDTO dto = new TeamParticipantDTO();
        dto.setId(participant.getId());
        dto.setStatus(participant.getStatus() != null ? String.valueOf(participant.getStatus()) : "UNKNOWN");

        // Team info (only ID and name)
        Team team = participant.getTeam();
        if (team != null) {
            TeamDTO teamDTO = new TeamDTO();
            teamDTO.setId(team.getId());
            teamDTO.setName(team.getName());
            dto.setTeamDTO(teamDTO);
        }

        // Player info
        User user = participant.getUser();
        if (user != null && user.getPlayerProfile() != null) {
            PlayerProfile profile = user.getPlayerProfile();
            PlayerProfileDTO profileDTO = new PlayerProfileDTO();
            profileDTO.setUserId(user.getId());
            profileDTO.setUsername(user.getUsername());
            profileDTO.setPosition(profile.getPosition());
            profileDTO.setNumber(profile.getNumber());
            profileDTO.setHeight(profile.getHeight());
            profileDTO.setWeight(profile.getWeight());

            if (profile.getTeam() != null) {
                profileDTO.setTeamId(profile.getTeam().getId());
                profileDTO.setTeamName(profile.getTeam().getName());
            }

            dto.setPlayerProfileDTO(profileDTO);
        }

        return dto;
    }
}
