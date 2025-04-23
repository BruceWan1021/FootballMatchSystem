package com.footballmatchsystem.repository;

import com.footballmatchsystem.model.Team;
import com.footballmatchsystem.model.TeamParticipant;
import com.footballmatchsystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TeamParticipantRepository extends JpaRepository<TeamParticipant, Long> {
    boolean existsByTeamAndUser(Team team, User user);

    List<TeamParticipant> findByTeamId(Long teamId);

    Optional<TeamParticipant> findByIdAndTeamId(Long id, Long teamId);
}