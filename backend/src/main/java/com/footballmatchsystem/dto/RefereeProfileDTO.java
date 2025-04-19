package com.footballmatchsystem.dto;

public class RefereeProfileDTO {

    private String licenseNumber;
    private Long tournamentId;
    private String tournamentName;
    private int height;
    private int weight;

    // 构造方法
    public RefereeProfileDTO() {
    }

    public RefereeProfileDTO(String licenseNumber, int height, int weight) {
        this.licenseNumber = licenseNumber;
        this.height = height;
        this.weight = weight;
    }

    // Getters & Setters
    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
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

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }
}
