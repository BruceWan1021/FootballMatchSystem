package com.footballmatchsystem.mapper;

import com.footballmatchsystem.dto.TeamDTO;
import com.footballmatchsystem.model.Team;

public class TeamMapper {

    public static Team toEntity(TeamDTO dto) {
        if (dto == null) return null;

        Team team = new Team();
        team.setId(dto.getId());
        team.setName(dto.getName());
        team.setShortName(dto.getShortName());
        team.setSchool(dto.getSchool());
        team.setFounded(dto.getFounded());
        team.setLogoUrl(dto.getLogoUrl());
        team.setHomeJerseyColor(dto.getHomeJerseyColor());
        team.setHomeShortsColor(dto.getHomeShortsColor());
        team.setHomeSocksColor(dto.getHomeSocksColor());
        team.setAwayJerseyColor(dto.getAwayJerseyColor());
        team.setAwayShortsColor(dto.getAwayShortsColor());
        team.setAwaySocksColor(dto.getAwaySocksColor());
        team.setDescription(dto.getDescription());
        return team;
    }

    public static TeamDTO toDTO(Team team) {
        if (team == null) return null;

        TeamDTO dto = new TeamDTO();
        dto.setId(team.getId());
        dto.setName(team.getName());
        dto.setShortName(team.getShortName());
        dto.setSchool(team.getSchool());
        dto.setFounded(team.getFounded());
        dto.setLogoUrl(team.getLogoUrl());
        dto.setHomeJerseyColor(team.getHomeJerseyColor());
        dto.setHomeShortsColor(team.getHomeShortsColor());
        dto.setHomeSocksColor(team.getHomeSocksColor());
        dto.setAwayJerseyColor(team.getAwayJerseyColor());
        dto.setAwayShortsColor(team.getAwayShortsColor());
        dto.setAwaySocksColor(team.getAwaySocksColor());
        dto.setDescription(team.getDescription());
        return dto;
    }
}
