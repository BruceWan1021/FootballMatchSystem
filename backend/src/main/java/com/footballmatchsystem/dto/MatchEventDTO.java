package com.footballmatchsystem.dto;

import lombok.Data;

@Data
public class MatchEventDTO {
    private String eventType;
    private Integer eventTime;
    private String eventDescription;
    private Integer playerNumber;
    private Long teamId;
    private Integer assistPlayerNumber;
    private Integer substitutePlayerNumber;
}

