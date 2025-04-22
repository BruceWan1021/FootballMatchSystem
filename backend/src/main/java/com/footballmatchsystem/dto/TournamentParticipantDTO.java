package com.footballmatchsystem.dto;

import lombok.Data;

@Data
public class TournamentParticipantDTO {
    private Long id;
    private String status;
    private TeamDTO teamDTO;
    private TournamentDTO tournamentDTO;
}