package com.footballmatchsystem.controller;

import com.footballmatchsystem.dto.PlayerProfileDTO;
import com.footballmatchsystem.dto.RefereeProfileDTO;
import com.footballmatchsystem.dto.UserDTO;
import com.footballmatchsystem.mapper.UserMapper;
import com.footballmatchsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private UserService userService;

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

    @PostMapping("/register/referee")
    public ResponseEntity<?> registerAsReferee(
            @RequestBody RefereeProfileDTO dto,
            Authentication authentication) {

        String username = authentication.getName();
        String result = userService.registerRefereeProfile(username, dto);

        if (result.contains("already")) {
            return ResponseEntity.badRequest().body(result);
        }

        return ResponseEntity.ok(result);
    }

}
