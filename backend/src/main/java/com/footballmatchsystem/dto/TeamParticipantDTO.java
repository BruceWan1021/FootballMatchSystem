package com.footballmatchsystem.dto;

import lombok.Data;

@Data
public class TeamParticipantDTO {
    private Long id;
    private String status;
    private TeamDTO teamDTO;
    private PlayerProfileDTO playerProfileDTO;
}
