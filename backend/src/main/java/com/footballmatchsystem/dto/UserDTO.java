package com.footballmatchsystem.dto;

import java.util.Set;

public class UserDTO {

    private Long id;
    private String username;
    private String email;
    private String name;
    private String avatarUrl;
    private Set<String> roles;

    private Long teamId;
    private String teamName;

    private Long tournamentId;
    private String tournamentName;

    private PlayerProfileDTO playerProfile;
    private RefereeProfileDTO refereeProfile;

    // ==== Getters and Setters ====

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }

    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public Set<String> getRoles() { return roles; }

    public void setRoles(Set<String> roles) { this.roles = roles; }

    public String getAvatarUrl() { return avatarUrl; }

    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public PlayerProfileDTO getPlayerProfile() { return playerProfile; }

    public void setPlayerProfile(PlayerProfileDTO playerProfile) { this.playerProfile = playerProfile; }

    public RefereeProfileDTO getRefereeProfile() { return refereeProfile; }

    public void setRefereeProfile(RefereeProfileDTO refereeProfile) { this.refereeProfile = refereeProfile; }

    public Long getTeamId() {
        return teamId;
    }

    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public Long getTournamentId() {
        return tournamentId;
    }

    public void setTournamentId(Long tournamentId) {
        this.tournamentId = tournamentId;
    }

    public String getTournamentName() {
        return tournamentName;
    }

    public void setTournamentName(String tournamentName) {
        this.tournamentName = tournamentName;
    }
}
