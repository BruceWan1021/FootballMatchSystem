package com.footballmatchsystem.service.impl;

import com.footballmatchsystem.dto.TeamMemberDTO;
import com.footballmatchsystem.model.Team;
import com.footballmatchsystem.model.User;
import com.footballmatchsystem.model.UserTeamRole;
import com.footballmatchsystem.repository.TeamRepository;
import com.footballmatchsystem.repository.UserRepository;
import com.footballmatchsystem.repository.UserTeamRoleRepository;
import com.footballmatchsystem.service.UserTeamRoleService;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserTeamRoleServiceImpl implements UserTeamRoleService {

    private final UserTeamRoleRepository userTeamRoleRepository;
    private final UserRepository userRepository;
    private final TeamRepository teamRepository;

    public UserTeamRoleServiceImpl(UserTeamRoleRepository userTeamRoleRepository,
                                   UserRepository userRepository,
                                   TeamRepository teamRepository) {
        this.userTeamRoleRepository = userTeamRoleRepository;
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
    }

    @Override
    public List<TeamMemberDTO> getTeamMembers(Long teamId) {
        return userTeamRoleRepository.findByTeamId(teamId).stream()
                .map(utr -> new TeamMemberDTO(
                        utr.getUser().getId(),
                        utr.getUser().getUsername(),
                        utr.getUser().getAvatarUrl(),
                        utr.getRole()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public boolean isUserInTeamWithRole(Long userId, Long teamId, String role) {
        return userTeamRoleRepository.existsByUserIdAndTeamIdAndRole(userId, teamId, role);
    }

    @Override
    public void addUserToTeam(Long userId, Long teamId, String role) {
        Optional<UserTeamRole> existing = userTeamRoleRepository.findByUserIdAndTeamId(userId, teamId);
        if (existing.isPresent()) {
            throw new IllegalStateException("User already in team.");
        }

        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        Team team = teamRepository.findById(teamId).orElseThrow(() -> new IllegalArgumentException("Team not found"));

        UserTeamRole newRelation = new UserTeamRole(user, team, role);
        userTeamRoleRepository.save(newRelation);
    }

    @Override
    public void removeUserFromTeam(Long userId, Long teamId) {
        Optional<UserTeamRole> relation = userTeamRoleRepository.findByUserIdAndTeamId(userId, teamId);
        relation.ifPresent(userTeamRoleRepository::delete);
    }

    @Override
    public String joinTeamByUsername(Long teamId, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Optional<UserTeamRole> existing = userTeamRoleRepository.findByUserIdAndTeamId(user.getId(), teamId);
        if (existing.isPresent()) {
            throw new IllegalStateException("Already joined");
        }

        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new IllegalArgumentException("Team not found"));

        UserTeamRole role = new UserTeamRole(user, team, "player");
        userTeamRoleRepository.save(role);

        return "Successfully joined the team.";
    }
}
