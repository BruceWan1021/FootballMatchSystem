package com.footballmatchsystem.service;

import com.footballmatchsystem.model.User;

import java.util.Optional;

public interface UserService {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    boolean validateUser(String username, String password);
    User registerUser(String username, String email, String password);
}
