package com.footballmatchsystem.service;

import com.footballmatchsystem.dto.MatchEventDTO;

import java.util.List;

public interface MatchEventService {
    boolean addEvent(Long matchId, MatchEventDTO matchEventDTO);
    List<MatchEventDTO> getMatchEvent(Long matchId);
}
