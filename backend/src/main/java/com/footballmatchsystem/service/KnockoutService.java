package com.footballmatchsystem.service;

import com.footballmatchsystem.dto.MatchDTO;
import com.footballmatchsystem.model.Match;

import java.util.List;

public interface KnockoutService {
    List<Match> generateFirstRound(Long tournamentId);
    Match completeMatchAndAdvance(Long matchId);
}
