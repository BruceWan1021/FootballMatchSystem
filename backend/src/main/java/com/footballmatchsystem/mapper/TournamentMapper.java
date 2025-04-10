package com.footballmatchsystem.mapper;

import com.footballmatchsystem.dto.TournamentDTO;
import com.footballmatchsystem.model.Tournament;

public class TournamentMapper {

    public static TournamentDTO toDTO(Tournament entity) {
        TournamentDTO dto = new TournamentDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setShortName(entity.getShortName());
        dto.setHostSchool(entity.getHostSchool());
        dto.setSeason(entity.getSeason());
        dto.setDescription(entity.getDescription());
        dto.setLogoUrl(entity.getLogoUrl());
        dto.setSignupStart(entity.getSignupStart());
        dto.setSignupEnd(entity.getSignupEnd());
        dto.setLeagueStart(entity.getLeagueStart());
        dto.setLeagueEnd(entity.getLeagueEnd());
        dto.setMinTeams(entity.getMinTeams());
        dto.setMaxTeams(entity.getMaxTeams());
        dto.setMinPlayersPerTeam(entity.getMinPlayersPerTeam());
        dto.setMaxPlayersPerTeam(entity.getMaxPlayersPerTeam());
        dto.setMatchFormat(entity.getMatchFormat());
        dto.setCustomFormatDescription(entity.getCustomFormatDescription());
        dto.setGameDuration(entity.getGameDuration());
        dto.setLocation(entity.getLocation());
        dto.setAgeGroup(entity.getAgeGroup());
        dto.setGender(entity.getGender());
        dto.setEquipmentRequired(entity.getEquipmentRequired());
        dto.setAwards(entity.getAwards());
        dto.setCancellationPolicy(entity.getCancellationPolicy());
        dto.setIsPublic(entity.getIsPublic());
        dto.setRequiresApproval(entity.getRequiresApproval());
        dto.setRuleAttachmentUrl(entity.getRuleAttachmentUrl());
        return dto;
    }

    public static Tournament toEntity(TournamentDTO dto) {
        Tournament entity = new Tournament();
        entity.setName(dto.getName());
        entity.setShortName(dto.getShortName());
        entity.setHostSchool(dto.getHostSchool());
        entity.setSeason(dto.getSeason());
        entity.setDescription(dto.getDescription());
        entity.setLogoUrl(dto.getLogoUrl());
        entity.setSignupStart(dto.getSignupStart());
        entity.setSignupEnd(dto.getSignupEnd());
        entity.setLeagueStart(dto.getLeagueStart());
        entity.setLeagueEnd(dto.getLeagueEnd());
        entity.setMinTeams(dto.getMinTeams());
        entity.setMaxTeams(dto.getMaxTeams());
        entity.setMinPlayersPerTeam(dto.getMinPlayersPerTeam());
        entity.setMaxPlayersPerTeam(dto.getMaxPlayersPerTeam());
        entity.setMatchFormat(dto.getMatchFormat());
        entity.setCustomFormatDescription(dto.getCustomFormatDescription());
        entity.setGameDuration(dto.getGameDuration());
        entity.setLocation(dto.getLocation());
        entity.setAgeGroup(dto.getAgeGroup());
        entity.setGender(dto.getGender());
        entity.setEquipmentRequired(dto.getEquipmentRequired());
        entity.setAwards(dto.getAwards());
        entity.setCancellationPolicy(dto.getCancellationPolicy());
        entity.setIsPublic(dto.getIsPublic());
        entity.setRequiresApproval(dto.getRequiresApproval());
        entity.setRuleAttachmentUrl(dto.getRuleAttachmentUrl());
        return entity;
    }
}
