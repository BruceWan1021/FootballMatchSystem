package com.footballmatchsystem.service.impl;

import com.footballmatchsystem.dto.TeamDTO;
import com.footballmatchsystem.mapper.TeamMapper;
import com.footballmatchsystem.model.*;
import com.footballmatchsystem.repository.*;
import com.footballmatchsystem.service.TeamService;
import jakarta.transaction.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TeamServiceImpl implements TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TeamParticipantRepository participantRepository;
    @Autowired
    private UserTeamRoleRepository userTeamRoleRepository;

    @Override
    public TeamDTO createTeam(TeamDTO teamDTO) {
        Team team = TeamMapper.toEntity(teamDTO);
        team.setCreatedAt(LocalDateTime.now());

        //从 SecurityContext 中获取当前用户名
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }

        //根据用户名获取 User 实体
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        //关联创建者
        team.setCreatedBy(user);

        Team saved = teamRepository.save(team);
        return TeamMapper.toDTO(saved);
    }


    @Override
    public List<TeamDTO> getAllTeams() {
        return teamRepository.findAll()
                .stream()
                .map(TeamMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<TeamDTO> getTeamById(Long id) {
        return teamRepository.findById(id)
                .map(TeamMapper::toDTO);
    }

    @Override
    public Optional<TeamDTO> updateTeam(Long id, TeamDTO updatedDTO) {
        return teamRepository.findById(id).map(existing -> {
            Team updated = TeamMapper.toEntity(updatedDTO);
            updated.setId(id);
            Team saved = teamRepository.save(updated);
            return TeamMapper.toDTO(saved);
        });
    }

    @Override
    public boolean deleteTeam(Long id) {
        if (teamRepository.existsById(id)) {
            teamRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public boolean existsByName(String name) {
        return teamRepository.existsByName(name);
    }

    @Override
    @Transactional
    public String joinTeamByUsername(Long teamId, String username) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        TeamParticipant.JoinStatus status = TeamParticipant.JoinStatus.PENDING;

        TeamParticipant participant = new TeamParticipant();
        participant.setTeam(team);
        participant.setUser(user);
        participant.setStatus(status);
        participantRepository.save(participant);

        return status == TeamParticipant.JoinStatus.APPROVED
                ? "Successfully Join"
                : "The application has been submitted and is awaiting review by the manager";
    }

    @Override
    public List<TeamDTO> getMyTeams(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<UserTeamRole> userTeamRoles = userTeamRoleRepository.findByUserId(user.getId());

        return userTeamRoles.stream()
                .map(UserTeamRole::getTeam)      // 提取 Team
                .distinct()                      // 防止重复
                .map(TeamMapper::toDTO)          // 转换成 DTO
                .collect(Collectors.toList());
    }


}
