package com.footballmatchsystem.mapper;

import com.footballmatchsystem.dto.*;
import com.footballmatchsystem.model.*;

import java.util.List;
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
        String stadium = match.getTeam1().getHomeStadium();
        if (stadium == null || stadium.isEmpty()) {
            stadium = match.getStadium();
        }
        dto.setStadium(stadium);


        // Team 1
        TeamDTO team1DTO = new TeamDTO();
        team1DTO.setId(match.getTeam1().getId());
        team1DTO.setName(match.getTeam1().getName());
        dto.setTeam1(team1DTO);

        // Team 2
        TeamDTO team2DTO = new TeamDTO();
        team2DTO.setId(match.getTeam2().getId());
        team2DTO.setName(match.getTeam2().getName());
        dto.setTeam2(team2DTO);

        // Tournament
        if (match.getTournament() != null) {
            Tournament t = match.getTournament();
            TournamentDTO tDto = new TournamentDTO();
            tDto.setId(t.getId());
            tDto.setName(t.getName());
            tDto.setShortName(t.getShortName());
            dto.setTournament(tDto);
        }

        // Match Team Info: home and away
        dto.setHomeTeamInfo(toTeamInfoDTO(match.getHomeTeamInfo()));
        dto.setAwayTeamInfo(toTeamInfoDTO(match.getAwayTeamInfo()));

        return dto;
    }

    public static MatchTeamInfoDTO toTeamInfoDTO(MatchTeamInfo teamInfo) {
        if (teamInfo == null || teamInfo.getTeam() == null) return null;

        MatchTeamInfoDTO dto = new MatchTeamInfoDTO();
        dto.setTeamId(teamInfo.getTeam().getId());
        dto.setTeamName(teamInfo.getTeam().getName());
        dto.setFormation(teamInfo.getFormation());

        if (teamInfo.getLineups() != null) {
            dto.setLineup(
                    teamInfo.getLineups().stream()
                            .map(MatchMapper::toPlayerLineupDTO)
                            .collect(Collectors.toList())
            );
        }

        return dto;
    }

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