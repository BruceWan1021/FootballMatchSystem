package com.footballmatchsystem.dto;

public class TeamMemberDTO {

    private Long userId;
    private String username;
    private String avatarUrl;
    private String role; // 队内角色，如 player/captain/manager

    public TeamMemberDTO() {}

    public TeamMemberDTO(Long userId, String username, String avatarUrl, String role) {
        this.userId = userId;
        this.username = username;
        this.avatarUrl = avatarUrl;
        this.role = role;
    }

    // ===== Getters & Setters =====

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
