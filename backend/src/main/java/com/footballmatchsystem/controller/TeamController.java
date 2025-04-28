package com.footballmatchsystem.controller;

import com.footballmatchsystem.dto.TeamDTO;
import com.footballmatchsystem.dto.TeamMemberDTO;
import com.footballmatchsystem.dto.TeamStatsDTO;
import com.footballmatchsystem.model.UserTeamRole;
import com.footballmatchsystem.service.TeamService;
import com.footballmatchsystem.service.UserService;
import com.footballmatchsystem.service.UserTeamRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    @Autowired
    private TeamService teamService;
    @Autowired
    private UserTeamRoleService userTeamRoleService;
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<TeamDTO> createTeam(@RequestBody TeamDTO teamDTO) {
        TeamDTO created = teamService.createTeam(teamDTO);
        return ResponseEntity.created(URI.create("/api/teams/" + created.getId())).body(created);
    }

    @GetMapping
    public List<TeamDTO> getAllTeams() {
        return teamService.getAllTeams();
    }

    @GetMapping("/my")
    public ResponseEntity<List<TeamDTO>> getMyTeams(Authentication authentication) {
        String username = authentication.getName();
        List<TeamDTO> teams = teamService.getMyTeams(username);
        return ResponseEntity.ok(teams);
    }

    /**
     * 获取指定队伍的统计数据
     * @param teamId 队伍ID
     * @return 队伍统计数据
     */
    @GetMapping("/{teamId}/stats")
    public ResponseEntity<TeamStatsDTO> getTeamStats(@PathVariable Long teamId) {
        try {
            // 调用 service 层方法获取队伍的统计数据
            TeamStatsDTO stats = teamService.getTeamStats(teamId);
            if (stats != null) {
                return ResponseEntity.ok(stats);  // 返回成功响应，包含队伍统计数据
            } else {
                return ResponseEntity.notFound().build();  // 队伍未找到，返回 404
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);  // 处理异常并返回 500 错误
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeamDTO> getTeamById(@PathVariable Long id) {
        return teamService.getTeamById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<TeamDTO> updateTeam(@PathVariable Long id, @RequestBody TeamDTO updatedTeamDTO) {
        return teamService.updateTeam(id, updatedTeamDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable Long id) {
        boolean deleted = teamService.deleteTeam(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/exists")
    public ResponseEntity<Boolean> existsByName(@RequestParam String name) {
        return ResponseEntity.ok(teamService.existsByName(name));
    }

    @GetMapping("/{id}/members")
    public ResponseEntity<List<TeamMemberDTO>> getTeamMembers(@PathVariable Long id) {
        return ResponseEntity.ok(userTeamRoleService.getTeamMembers(id));
    }

    @PutMapping("/{teamId}/members/{userId}/role")
    public ResponseEntity<?> updateTeamRole(
            @PathVariable Long teamId,
            @PathVariable Long userId,
            @RequestBody Map<String, String> body) {

        String roleStr = body.get("role");

        if (roleStr == null) {
            return ResponseEntity.badRequest().body("Role is required.");
        }

        try {
            UserTeamRole.TeamRole role = UserTeamRole.TeamRole.valueOf(roleStr.toUpperCase());
            userTeamRoleService.updateUserRoleInTeam(userId, teamId, role);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid role value.");
        }
    }

    @PostMapping("/{id}/join")
    public ResponseEntity<String> requestJoinTeam(
            @PathVariable Long id,
            Authentication authentication) {

        String username = authentication.getName();
        String resultMessage = teamService.joinTeamByUsername(id, username);
        return ResponseEntity.ok(resultMessage);
    }

}
