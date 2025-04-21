package com.footballmatchsystem.repository;

import com.footballmatchsystem.model.Team;
import com.footballmatchsystem.model.Tournament;
import com.footballmatchsystem.model.TournamentParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TournamentParticipantRepository extends JpaRepository<TournamentParticipant, Long> {
    boolean existsByTournamentAndTeam(Tournament tournament, Team team);
    List<Team> findApprovedTeamsByTournamentId(Long tournamentId);
}
