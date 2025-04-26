package com.footballmatchsystem.service;

import com.footballmatchsystem.dto.MatchDTO;
import com.footballmatchsystem.model.Match;
import com.footballmatchsystem.model.MatchStatus;
import com.footballmatchsystem.model.MatchTeamInfo;

import java.util.List;
import java.util.Optional;

public interface MatchService {

    List<Match> getMatchesByStatus(MatchStatus status);

    List<Match> getMatches();

    List<Match> getScheduledMatches();

    Match updateMatchStatusToInProgress(Long matchId);

    Match updateMatchStatusToCompleted(Long matchId);

    Match createMatch(Match match);

    List<MatchDTO> getMatchesByTournamentId(Long tournamentId);

    Optional<Match> getMatchById(Long id);

    List<MatchDTO> getMatchesByTeamId(Long id);

    Match updateMatch(Long matchId, MatchDTO matchDTO);

    MatchTeamInfo getMatchTeamInfo(Long matchId, Long teamId);
}
