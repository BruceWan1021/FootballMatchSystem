package com.footballmatchsystem.controller;

import com.footballmatchsystem.dto.MatchDTO;
import com.footballmatchsystem.dto.PlayerProfileDTO;
import com.footballmatchsystem.dto.RefereeProfileDTO;
import com.footballmatchsystem.dto.UserDTO;
import com.footballmatchsystem.service.MatchService;
import com.footballmatchsystem.service.PlayerProfileService;
import com.footballmatchsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private UserService userService;
    @Autowired
    private PlayerProfileService playerProfileService;
    @Autowired
    private MatchService matchService;

    public ProfileController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(userService.getCurrentUser(username));
    }

    /**
     * 用户选择成为球员，填写球员信息
     */
    @PostMapping("/register/player")
    public ResponseEntity<?> registerAsPlayer(
            @RequestBody PlayerProfileDTO dto,
            Authentication authentication) {

        String username = authentication.getName();

        String result = userService.registerPlayerProfile(username, dto);

        if (result.contains("already")) {
            return ResponseEntity.badRequest().body(result); // 错误提示
        }

        return ResponseEntity.ok(result); // 成功提示
    }


    @GetMapping("/player/{teamId}")
    public ResponseEntity<List<PlayerProfileDTO>> getPlayersByTeam(
            @PathVariable Long teamId) {
        List<PlayerProfileDTO> players = playerProfileService.findByTeamId(teamId);
        return ResponseEntity.ok(players);
    }

    @PutMapping("/player/{userId}")
    public ResponseEntity<Void> updatePlayerProfile(
            @PathVariable Long userId,
            @RequestBody PlayerProfileDTO dto) {
        playerProfileService.updatePlayerProfile(userId, dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/player/{userId}/matches")
    public ResponseEntity<List<MatchDTO>> getMatchesByPlayer(
            @PathVariable Long userId,
            Authentication authentication) {

        List<MatchDTO> matches = matchService.getMatchesByPlayer(userId);
        return ResponseEntity.ok(matches);
    }


}
