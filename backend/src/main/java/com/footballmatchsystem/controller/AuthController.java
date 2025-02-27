package com.footballmatchsystem.controller;

import com.footballmatchsystem.dto.LoginRequest;
import com.footballmatchsystem.dto.RegisterRequest;
import com.footballmatchsystem.model.User;
import com.footballmatchsystem.service.EmailService;
import com.footballmatchsystem.service.JwtService;
import com.footballmatchsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private JwtService jwtService;

    // 临时存放未验证的注册信息
    private final Map<String, RegisterRequest> pendingUsers = new ConcurrentHashMap<>();

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userService.findByUsername(request.getUsername());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", "User not found"));
        }

        User user = userOpt.get();
        if (!userService.validateUser(request.getUsername(), request.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", "Invalid password"));
        }
        String token = jwtService.generateToken(user.getUsername());

        return ResponseEntity.ok(Map.of(
                "message", "Login successful",
                "token", token // 返回生成的token
        ));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        if (userService.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", "Username already taken"));
        }

        if (userService.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", "Email already registered"));
        }

        // 保存到临时存储
        pendingUsers.put(request.getEmail(), request);
        emailService.sendVerificationEmail(request.getEmail());
        return ResponseEntity.ok(Collections.singletonMap("message", "Verification code sent to " + request.getEmail()));
    }

    @PostMapping("/verify-email")
    public ResponseEntity<?> verifyCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("code");

        boolean isValid = emailService.verifyCode(email, code);
        if (!isValid) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid verification code"));
        }

        RegisterRequest userRequest = pendingUsers.remove(email);
        if (userRequest == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "No pending registration found"));
        }

        // 注册用户
        userService.registerUser(userRequest.getUsername(), userRequest.getEmail(), userRequest.getPassword());
        return ResponseEntity.ok(Map.of("message", "Verification successful, user registered!"));
    }
}
