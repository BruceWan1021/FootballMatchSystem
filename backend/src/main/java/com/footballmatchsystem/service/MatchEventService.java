package com.footballmatchsystem.service;

import com.footballmatchsystem.dto.MatchEventDTO;

public interface MatchEventService {
    boolean addEvent(Long matchId, MatchEventDTO matchEventDTO);
}
