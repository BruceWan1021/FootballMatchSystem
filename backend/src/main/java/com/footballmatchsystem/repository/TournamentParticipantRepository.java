package com.footballmatchsystem.repository;

import com.footballmatchsystem.model.Team;
import com.footballmatchsystem.model.Tournament;
import com.footballmatchsystem.model.TournamentParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TournamentParticipantRepository extends JpaRepository<TournamentParticipant, Long> {
    boolean existsByTournamentAndTeam(Tournament tournament, Team team);
    @Query("SELECT tp.team FROM TournamentParticipant tp WHERE tp.tournament.id = :tournamentId AND tp.status = 'APPROVED'")
    List<Team> findApprovedTeamsByTournamentId(@Param("tournamentId") Long tournamentId);
}
