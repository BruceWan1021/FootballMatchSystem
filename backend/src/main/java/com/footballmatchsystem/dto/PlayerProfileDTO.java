package com.footballmatchsystem.dto;

public class PlayerProfileDTO {

    private String position;
    private int number;
    private Long teamId;
    private String teamName;
    private int height;
    private int weight;

    // 构造方法
    public PlayerProfileDTO() {}

    public PlayerProfileDTO(String position, int number, int height, int weight) {
        this.position = position;
        this.number = number;
        this.height = height;
        this.weight = weight;
    }

    // Getters 和 Setters
    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

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
