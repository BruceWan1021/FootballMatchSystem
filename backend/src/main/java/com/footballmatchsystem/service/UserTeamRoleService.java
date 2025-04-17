package com.footballmatchsystem.service;

import com.footballmatchsystem.dto.TeamMemberDTO;

import java.util.List;

public interface UserTeamRoleService {

    List<TeamMemberDTO> getTeamMembers(Long teamId);

    boolean isUserInTeamWithRole(Long userId, Long teamId, String role);

    void addUserToTeam(Long userId, Long teamId, String role);

    void removeUserFromTeam(Long userId, Long teamId);

    String joinTeamByUsername(Long id, String username);
}
