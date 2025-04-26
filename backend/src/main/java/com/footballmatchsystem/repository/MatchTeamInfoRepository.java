package com.footballmatchsystem.repository;

import com.footballmatchsystem.model.MatchTeamInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MatchTeamInfoRepository extends JpaRepository<MatchTeamInfo, Long> {
    MatchTeamInfo findByMatchIdAndTeamId(Long matchId, Long teamId);

    @Query("SELECT mti FROM MatchTeamInfo mti WHERE mti.team.id = :teamId ORDER BY mti.match.updatedAt DESC")
    Optional<MatchTeamInfo> findMostRecentMatchTeamInfoByTeamId(@Param("teamId") Long teamId);


}
