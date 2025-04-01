package com.footballmatchsystem.service;

import com.footballmatchsystem.dto.TeamDTO;
import com.footballmatchsystem.mapper.TeamMapper;
import com.footballmatchsystem.model.Team;
import com.footballmatchsystem.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    public TeamDTO createTeam(TeamDTO teamDTO) {
        Team team = TeamMapper.toEntity(teamDTO);
        Team saved = teamRepository.save(team);
        return TeamMapper.toDTO(saved);
    }

    public List<TeamDTO> getAllTeams() {
        return teamRepository.findAll()
                .stream()
                .map(TeamMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<TeamDTO> getTeamById(Long id) {
        return teamRepository.findById(id)
                .map(TeamMapper::toDTO);
    }

    public Optional<TeamDTO> updateTeam(Long id, TeamDTO updatedDTO) {
        return teamRepository.findById(id).map(existing -> {
            Team updated = TeamMapper.toEntity(updatedDTO);
            updated.setId(id);
            Team saved = teamRepository.save(updated);
            return TeamMapper.toDTO(saved);
        });
    }

    public boolean deleteTeam(Long id) {
        if (teamRepository.existsById(id)) {
            teamRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean existsByName(String name) {
        return teamRepository.existsByName(name);
    }
}
