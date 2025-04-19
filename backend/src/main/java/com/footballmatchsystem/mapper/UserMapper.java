package com.footballmatchsystem.mapper;

import com.footballmatchsystem.dto.PlayerProfileDTO;
import com.footballmatchsystem.dto.RefereeProfileDTO;
import com.footballmatchsystem.dto.UserDTO;
import com.footballmatchsystem.model.*;

import java.util.stream.Collectors;

public class UserMapper {

    public static UserDTO toDto(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setAvatarUrl(user.getAvatarUrl());

        // 角色枚举转为字符串集合
        dto.setRoles(user.getRoles().stream()
                .map(Enum::name)
                .collect(Collectors.toSet()));

        if (user.getPlayerProfile() != null) {
            PlayerProfileDTO playerDTO = PlayerProfileMapper.toDto(user.getPlayerProfile());

            Team team = user.getPlayerProfile().getTeam();
            if (team != null) {
                playerDTO.setTeamId(team.getId());
                playerDTO.setTeamName(team.getName());

                // 同时设置到 UserDTO 顶层
                dto.setTeamId(team.getId());
                dto.setTeamName(team.getName());
            }

            dto.setPlayerProfile(playerDTO);
        }

        if (user.getRefereeProfile() != null) {
            RefereeProfileDTO refereeDto = RefereeProfileMapper.toDto(user.getRefereeProfile());

            Tournament tournament = user.getRefereeProfile().getTournament();
            if (tournament != null) {
                refereeDto.setTournamentId(tournament.getId());
                refereeDto.setTournamentName(tournament.getName());

                // 同时设置到 UserDTO 顶层
                dto.setTournamentId(tournament.getId());
                dto.setTournamentName(tournament.getName());
            }

            dto.setRefereeProfile(refereeDto);
        }

        return dto;
    }
}
