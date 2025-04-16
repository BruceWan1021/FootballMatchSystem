package com.footballmatchsystem.service;

import com.footballmatchsystem.dto.TeamDTO;

import java.util.List;
import java.util.Optional;

public interface TeamService {

    TeamDTO createTeam(TeamDTO teamDTO);

    List<TeamDTO> getAllTeams();

    Optional<TeamDTO> getTeamById(Long id);

    Optional<TeamDTO> updateTeam(Long id, TeamDTO updatedDTO);

    boolean deleteTeam(Long id);

    boolean existsByName(String name);
}
