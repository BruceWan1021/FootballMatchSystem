package com.footballmatchsystem.controller;

import com.footballmatchsystem.dto.TeamDTO;
import com.footballmatchsystem.dto.TeamMemberDTO;
import com.footballmatchsystem.service.TeamService;
import com.footballmatchsystem.service.UserService;
import com.footballmatchsystem.service.UserTeamRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.net.URI;
import java.util.List;

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

    @PostMapping("/{id}/join")
    public ResponseEntity<String> requestJoinTeam(
            @PathVariable Long id,
            Authentication authentication) {

        String username = authentication.getName();
        String resultMessage = teamService.joinTeamByUsername(id, username);
        return ResponseEntity.ok(resultMessage);
    }

}
