package com.footballmatchsystem.mapper;

import com.footballmatchsystem.dto.*;
import com.footballmatchsystem.model.*;

import java.util.stream.Collectors;

public class MatchMapper {

    public static MatchDTO toDTO(Match match) {
        MatchDTO dto = new MatchDTO();
        dto.setId(match.getId());
        dto.setRound(match.getRound());
        dto.setScore1(match.getScore1());
        dto.setScore2(match.getScore2());
        dto.setMatchDate(match.getMatchDate());
        dto.setStatus(match.getStatus());

        // Set the stadium for the match
        String stadium = match.getTeam1().getHomeStadium();
        if (stadium == null || stadium.isEmpty()) {
            stadium = match.getStadium();
        }
        dto.setStadium(stadium);

        // Mapping Team 1
        TeamDTO team1DTO = new TeamDTO();
        team1DTO.setId(match.getTeam1().getId());
        team1DTO.setName(match.getTeam1().getName());
        team1DTO.setHomeStadium(match.getTeam1().getHomeStadium());
        team1DTO.setLogoUrl(match.getTeam1().getLogoUrl());
        dto.setTeam1(team1DTO);

        // Mapping Team 2
        TeamDTO team2DTO = new TeamDTO();
        team2DTO.setId(match.getTeam2().getId());
        team2DTO.setName(match.getTeam2().getName());
        team2DTO.setLogoUrl(match.getTeam2().getLogoUrl());
        dto.setTeam2(team2DTO);

        // Mapping Tournament details
        if (match.getTournament() != null) {
            Tournament t = match.getTournament();
            TournamentDTO tDto = new TournamentDTO();
            tDto.setId(t.getId());
            tDto.setName(t.getName());
            tDto.setShortName(t.getShortName());
            dto.setTournament(tDto);
        }

        // Mapping Match Team Info (home and away teams)
        dto.setHomeTeamInfo(toTeamInfoDTO(match.getHomeTeamInfo()));
        dto.setAwayTeamInfo(toTeamInfoDTO(match.getAwayTeamInfo()));

        return dto;
    }

    // Converts MatchTeamInfo entity to MatchTeamInfoDTO
    public static MatchTeamInfoDTO toTeamInfoDTO(MatchTeamInfo teamInfo) {
        if (teamInfo == null || teamInfo.getTeam() == null) return null;

        MatchTeamInfoDTO dto = new MatchTeamInfoDTO();
        dto.setId(teamInfo.getId());
        dto.setTeamId(teamInfo.getTeam().getId());
        dto.setTeamName(teamInfo.getTeam().getName());
        dto.setFormation(teamInfo.getFormation());

        // Mapping Player Lineup
        if (teamInfo.getLineups() != null) {
            dto.setLineup(
                    teamInfo.getLineups().stream()
                            .map(MatchMapper::toPlayerLineupDTO)
                            .collect(Collectors.toList())
            );
        }

        return dto;
    }

    // Converts MatchLineup entity to MatchPlayerLineupDTO
    public static MatchPlayerLineupDTO toPlayerLineupDTO(MatchLineup lineup) {
        MatchPlayerLineupDTO dto = new MatchPlayerLineupDTO();
        if (lineup.getPlayer() != null) {
            dto.setPlayerId(lineup.getPlayer().getId());
            dto.setPlayerName(lineup.getPlayer().getUser().getUsername());
        }
        dto.setPosition(lineup.getPosition().name());
        dto.setStarting(lineup.isStarting());
        return dto;
    }
}
