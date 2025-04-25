package com.footballmatchsystem.repository;

import com.footballmatchsystem.model.MatchLineup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MatchLineupRepository extends JpaRepository<MatchLineup, Long> {
    void deleteByMatchTeamInfoId(Long matchTeamInfoId);
    List<MatchLineup> findByMatchTeamInfoIdOrderByIsStartingDescPositionAsc(Long matchTeamInfoId);
}
