package com.footballmatchsystem.service;

import com.footballmatchsystem.model.Match;
import com.footballmatchsystem.model.MatchStatus;

import java.util.List;

public interface MatchService {

    List<Match> getMatchesByStatus(MatchStatus status);

    List<Match> getMatches();

    List<Match> getScheduledMatches();

    Match updateMatchStatusToInProgress(Long matchId);

    Match updateMatchStatusToCompleted(Long matchId);

    Match createMatch(Match match);


}
