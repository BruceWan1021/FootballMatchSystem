package com.footballmatchsystem.dto;

public class LineupRequest {

    private Long playerId;  // 球员 ID
    private boolean isStarting;  // 是否为首发球员
    private String position;  // 球员位置 (FW, AM, CM, DM, etc.)

    // Getters and Setters
    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public boolean isStarting() {
        return isStarting;
    }

    public void setStarting(boolean isStarting) {
        this.isStarting = isStarting;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }
}
