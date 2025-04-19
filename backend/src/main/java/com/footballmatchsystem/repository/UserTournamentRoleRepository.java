package com.footballmatchsystem.repository;

import com.footballmatchsystem.model.Tournament;
import com.footballmatchsystem.model.User;
import com.footballmatchsystem.model.UserTournamentRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserTournamentRoleRepository extends JpaRepository<UserTournamentRole, Long> {

    List<UserTournamentRole> findByUser(User user);
    List<UserTournamentRole> findByTournament(Tournament tournament);
    List<UserTournamentRole> findByUserAndRoleIn(User user, List<UserTournamentRole.TournamentRole> admin);
}
