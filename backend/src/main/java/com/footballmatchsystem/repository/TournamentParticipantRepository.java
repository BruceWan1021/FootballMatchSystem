package com.footballmatchsystem.repository;

import com.footballmatchsystem.model.Team;
import com.footballmatchsystem.model.Tournament;
import com.footballmatchsystem.model.TournamentParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TournamentParticipantRepository extends JpaRepository<TournamentParticipant, Long> {
    boolean existsByTournamentAndTeam(Tournament tournament, Team team);
}
