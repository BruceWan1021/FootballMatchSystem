package com.footballmatchsystem.repository;

import com.footballmatchsystem.model.Match;
import com.footballmatchsystem.model.MatchStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MatchRepository extends JpaRepository<Match, Long> {

    List<Match> findAll();
    List<Match> findByStatus(MatchStatus status);
    List<Match> findByTournamentId(Long tournamentId);
    List<Match> findByTournamentIdAndStatus(Long id, MatchStatus completed);
}
