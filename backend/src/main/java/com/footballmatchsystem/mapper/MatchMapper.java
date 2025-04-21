package com.footballmatchsystem.mapper;

import com.footballmatchsystem.dto.MatchDTO;
import com.footballmatchsystem.dto.TeamDTO;
import com.footballmatchsystem.dto.TournamentDTO;
import com.footballmatchsystem.model.Match;
import com.footballmatchsystem.model.Tournament;

public class MatchMapper {

    public static MatchDTO toDTO(Match match) {
        MatchDTO dto = new MatchDTO();
        dto.setId(match.getId());
        dto.setRound(match.getRound());
        dto.setScore1(match.getScore1());
        dto.setScore2(match.getScore2());
        dto.setMatchDate(match.getMatchDate());
        dto.setStatus(match.getStatus());
        dto.setStadium(match.getTeam1().getHomeStadium());

        TeamDTO team1DTO = new TeamDTO();
        team1DTO.setId(match.getTeam1().getId());
        team1DTO.setName(match.getTeam1().getName());
        dto.setTeam1(team1DTO);

        TeamDTO team2DTO = new TeamDTO();
        team2DTO.setId(match.getTeam2().getId());
        team2DTO.setName(match.getTeam2().getName());
        dto.setTeam2(team2DTO);

        // tournament
        if (match.getTournament() != null) {
            Tournament t = match.getTournament();
            TournamentDTO tDto = new TournamentDTO();
            tDto.setId(t.getId());
            tDto.setName(t.getName());
            tDto.setShortName(t.getShortName());
            dto.setTournament(tDto);
        }

        return dto;
    }

}
