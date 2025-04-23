package com.footballmatchsystem.repository;

import com.footballmatchsystem.model.Match;
import com.footballmatchsystem.model.MatchStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MatchRepository extends JpaRepository<Match, Long> {

    List<Match> findAll();
    List<Match> findByStatus(MatchStatus status);
    List<Match> findByTournamentId(Long tournamentId);
    List<Match> findByTournamentIdAndStatus(Long id, MatchStatus completed);
    @Query("SELECT m FROM Match m WHERE m.team1.id = :teamId OR m.team2.id = :teamId")
    List<Match> findAllByTeamId(@Param("teamId") Long teamId);
}
