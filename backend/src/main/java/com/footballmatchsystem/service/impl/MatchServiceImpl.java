package com.footballmatchsystem.service.impl;

import com.footballmatchsystem.dto.MatchDTO;
import com.footballmatchsystem.dto.TeamDTO;
import com.footballmatchsystem.model.Match;
import com.footballmatchsystem.model.MatchStatus;
import com.footballmatchsystem.model.Team;
import com.footballmatchsystem.model.Tournament;
import com.footballmatchsystem.repository.MatchRepository;
import com.footballmatchsystem.repository.TeamRepository;
import com.footballmatchsystem.repository.TournamentRepository;
import com.footballmatchsystem.service.MatchService;
import com.footballmatchsystem.util.RoundRobinScheduler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MatchServiceImpl implements MatchService {

    @Autowired
    private MatchRepository matchRepository;
    @Autowired
    private TournamentRepository tournamentRepository;
    @Autowired
    private TeamRepository teamRepository;

    @Override
    public List<Match> getMatchesByStatus(MatchStatus status){
        return matchRepository.findByStatus(status);
    }

    @Override
    public List<Match> getMatches(){
        return matchRepository.findAll();
    }

    @Override
    public List<Match> getScheduledMatches() {
        return matchRepository.findByStatus(MatchStatus.SCHEDULED);
    }

    @Override
    public Match updateMatchStatusToInProgress(Long matchId){
        Match match = matchRepository.findById(matchId)
                .orElseThrow(() -> new RuntimeException("Match not found"));
        match.setStatus(MatchStatus.IN_PROGRESS);
        return matchRepository.save(match);
    }

    @Override
    public Match updateMatchStatusToCompleted(Long matchId){
        Match match = matchRepository.findById(matchId)
                .orElseThrow(() -> new RuntimeException("Match not found"));
        match.setStatus(MatchStatus.COMPLETED);
        return matchRepository.save(match);
    }

    @Override
    public Match createMatch(Match match){
        match.setStatus(MatchStatus.SCHEDULED);
        return matchRepository.save(match);
    }

    @Override
    public List<MatchDTO> getMatchesByTournamentId(Long tournamentId) {
        List<Match> matches = matchRepository.findByTournamentId(tournamentId);

        return matches.stream().map(match -> {
            MatchDTO dto = new MatchDTO();
            dto.setId(match.getId());
            dto.setRound(match.getRound());
            dto.setTeam1(toTeamDTO(match.getTeam1()));
            dto.setTeam2(toTeamDTO(match.getTeam2()));
            dto.setScore1(match.getScore1());
            dto.setScore2(match.getScore2());
            dto.setMatchDate(match.getMatchDate());
            dto.setStatus(match.getStatus());
            dto.setStadium(match.getTeam1().getHomeStadium()); // 默认使用 team1 主场
            return dto;
        }).toList();
    }

    private TeamDTO toTeamDTO(Team team) {
        if (team == null) return null;
        TeamDTO dto = new TeamDTO();
        dto.setId(team.getId());
        dto.setName(team.getName());
        dto.setLogoUrl(team.getLogoUrl());
        return dto;
    }



}
