package com.footballmatchsystem.repository;

import com.footballmatchsystem.model.Team;
import com.footballmatchsystem.model.TeamParticipant;
import com.footballmatchsystem.model.Tournament;
import com.footballmatchsystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamParticipantRepository extends JpaRepository<TeamParticipant, Long> {
    boolean existsByTeamAndUser(Team team, User user);
}
