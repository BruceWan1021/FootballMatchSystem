package com.footballmatchsystem.service;

public interface JwtService {

    String generateToken(String username);

    boolean validateToken(String token, String username);

    String extractUsername(String token);
}
