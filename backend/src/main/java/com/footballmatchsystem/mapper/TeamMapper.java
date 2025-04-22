package com.footballmatchsystem.mapper;

import com.footballmatchsystem.dto.TeamContactDTO;
import com.footballmatchsystem.dto.TeamDTO;
import com.footballmatchsystem.model.Team;
import com.footballmatchsystem.model.TeamContact;

import java.util.List;
import java.util.stream.Collectors;

public class TeamMapper {

    public static Team toEntity(TeamDTO dto) {
        if (dto == null) return null;

        Team team = new Team();
        team.setId(dto.getId());
        team.setName(dto.getName());
        team.setShortName(dto.getShortName());
        team.setSchool(dto.getSchool());
        team.setHomeStadium(dto.getHomeStadium());
        team.setFounded(dto.getFounded());
        team.setLogoUrl(dto.getLogoUrl());
        team.setHomeJerseyColor(dto.getHomeJerseyColor());
        team.setHomeShortsColor(dto.getHomeShortsColor());
        team.setHomeSocksColor(dto.getHomeSocksColor());
        team.setAwayJerseyColor(dto.getAwayJerseyColor());
        team.setAwayShortsColor(dto.getAwayShortsColor());
        team.setAwaySocksColor(dto.getAwaySocksColor());
        team.setDescription(dto.getDescription());

        if (dto.getContacts() != null) {
            List<TeamContact> contacts = dto.getContacts().stream()
                    .map(contactDTO -> {
                        TeamContact contact = new TeamContact();
                        contact.setName(contactDTO.getName());
                        contact.setEmail(contactDTO.getEmail());
                        contact.setPhone(contactDTO.getPhone());
                        contact.setRole(contactDTO.getRole());
                        contact.setIsPrimary(contact.getIsPrimary());
                        contact.setTeam(team);
                        return contact;
                    }).collect(Collectors.toList());
            team.setContacts(contacts);
        }

        return team;
    }

    public static TeamDTO toDTO(Team team) {
        if (team == null) return null;

        TeamDTO dto = new TeamDTO();
        dto.setId(team.getId());
        dto.setName(team.getName());
        dto.setShortName(team.getShortName());
        dto.setSchool(team.getSchool());
        dto.setHomeStadium(team.getHomeStadium());
        dto.setFounded(team.getFounded());
        dto.setLogoUrl(team.getLogoUrl());
        dto.setHomeJerseyColor(team.getHomeJerseyColor());
        dto.setHomeShortsColor(team.getHomeShortsColor());
        dto.setHomeSocksColor(team.getHomeSocksColor());
        dto.setAwayJerseyColor(team.getAwayJerseyColor());
        dto.setAwayShortsColor(team.getAwayShortsColor());
        dto.setAwaySocksColor(team.getAwaySocksColor());
        dto.setDescription(team.getDescription());

        if (team.getContacts() != null) {
            List<TeamContactDTO> contactDTOs = team.getContacts().stream()
                    .map(contact -> {
                        TeamContactDTO contactDTO = new TeamContactDTO();
                        contactDTO.setName(contact.getName());
                        contactDTO.setEmail(contact.getEmail());
                        contactDTO.setPhone(contact.getPhone());
                        contactDTO.setIsPrimary(contact.getIsPrimary());
                        contactDTO.setRole(contact.getRole());
                        return contactDTO;
                    }).collect(Collectors.toList());
            dto.setContacts(contactDTOs);
        }

        return dto;
    }
}
