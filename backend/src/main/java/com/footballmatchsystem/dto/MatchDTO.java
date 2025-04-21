package com.footballmatchsystem.dto;

import com.footballmatchsystem.model.MatchStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MatchDTO {
    private Long id;
    private Integer round;
    private TournamentDTO tournament;
    private TeamDTO team1;
    private TeamDTO team2;
    private int score1;
    private int score2;
    private LocalDateTime matchDate;
    private MatchStatus status;
    private String stadium;
}
