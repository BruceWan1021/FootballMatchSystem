package com.footballmatchsystem.service;

import com.footballmatchsystem.dto.MatchPlayerLineupDTO;
import com.footballmatchsystem.model.MatchLineup;

import java.util.List;

public interface LineupService {

    List<MatchLineup> saveLineup(Long matchTeamInfoId, List<MatchPlayerLineupDTO> lineupDTOs);

    List<MatchLineup> getLineupByMatchTeam(Long matchTeamInfoId);
}
