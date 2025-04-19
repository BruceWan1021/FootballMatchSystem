package com.footballmatchsystem.service;

import com.footballmatchsystem.dto.PlayerProfileDTO;
import com.footballmatchsystem.dto.RefereeProfileDTO;
import com.footballmatchsystem.dto.UserDTO;
import com.footballmatchsystem.model.User;

import java.util.Optional;

public interface UserService {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    boolean validateUser(String username, String password);
    User registerUser(String username, String email, String password);
    Long findUserIdByUsername(String username);
    String registerPlayerProfile(String username, PlayerProfileDTO dto);
    String registerRefereeProfile(String username, RefereeProfileDTO dto);
    UserDTO getCurrentUser(String username);
}
