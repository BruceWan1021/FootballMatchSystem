package com.footballmatchsystem.service.impl;

import com.footballmatchsystem.dto.MatchDTO;
import com.footballmatchsystem.dto.TeamDTO;
import com.footballmatchsystem.mapper.MatchMapper;
import com.footballmatchsystem.mapper.TeamMapper;
import com.footballmatchsystem.mapper.TournamentMapper;
import com.footballmatchsystem.model.*;
import com.footballmatchsystem.repository.MatchRepository;
import com.footballmatchsystem.repository.TeamRepository;
import com.footballmatchsystem.repository.TournamentRepository;
import com.footballmatchsystem.repository.MatchTeamInfoRepository;
import com.footballmatchsystem.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MatchServiceImpl implements MatchService {

    @Autowired
    private MatchRepository matchRepository;
    @Autowired
    private TournamentRepository tournamentRepository;
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private MatchTeamInfoRepository matchTeamInfoRepository;

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
    public Match createMatch(Match match) {
        match.setStatus(MatchStatus.SCHEDULED);
        Match savedMatch = matchRepository.save(match);

        // 创建主队 MatchTeamInfo
        MatchTeamInfo homeTeamInfo = new MatchTeamInfo();
        homeTeamInfo.setMatch(savedMatch);
        homeTeamInfo.setTeam(savedMatch.getTeam1());
        homeTeamInfo.setFormation("4-4-2"); // 默认阵型
        matchTeamInfoRepository.save(homeTeamInfo);

        // 创建客队 MatchTeamInfo
        MatchTeamInfo awayTeamInfo = new MatchTeamInfo();
        awayTeamInfo.setMatch(savedMatch);
        awayTeamInfo.setTeam(savedMatch.getTeam2());
        awayTeamInfo.setFormation("4-4-2"); // 默认阵型
        matchTeamInfoRepository.save(awayTeamInfo);

        return savedMatch;
    }

    @Override
    public List<MatchDTO> getMatchesByTournamentId(Long tournamentId) {
        List<Match> matches = matchRepository.findByTournamentId(tournamentId);
        return matches.stream()
                .map(MatchMapper::toDTO)
                .toList();
    }

    private TeamDTO toTeamDTO(Team team) {
        if (team == null) return null;
        TeamDTO dto = new TeamDTO();
        dto.setId(team.getId());
        dto.setName(team.getName());
        dto.setLogoUrl(team.getLogoUrl());
        return dto;
    }

    @Override
    public Optional<Match> getMatchById(Long id) {
        return matchRepository.findById(id);
    }

    @Override
    public List<MatchDTO> getMatchesByTeamId(Long id) {
        List<Match> matches = matchRepository.findAllByTeamId(id);
        return matches.stream()
                .map(MatchMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Match updateMatch(Long matchId, MatchDTO matchDTO) {
        // Fetch the match from the database
        Match match = matchRepository.findById(matchId).orElse(null);
        if (match == null) {
            return null;
        }

        // Update match properties with data from DTO
        match.setScore1(matchDTO.getScore1());
        match.setScore2(matchDTO.getScore2());
        match.setMatchDate(matchDTO.getMatchDate());
        match.setStatus(matchDTO.getStatus());
        match.setStadium(matchDTO.getStadium());

        // Save the updated match back to the database
        return matchRepository.save(match);
    }

    public MatchTeamInfo getMatchTeamInfo(Long matchId, Long teamId) {
        return matchTeamInfoRepository.findByMatchIdAndTeamId(matchId, teamId);
    }
}
