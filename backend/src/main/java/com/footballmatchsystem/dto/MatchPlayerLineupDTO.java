package com.footballmatchsystem.dto;

import lombok.Data;

@Data
public class MatchPlayerLineupDTO {
    private Long playerId;
    private String playerName;
    private String position; // e.g., GK, DF, MF, FW
    private boolean isStarting; // true = 首发，false = 替补
}
