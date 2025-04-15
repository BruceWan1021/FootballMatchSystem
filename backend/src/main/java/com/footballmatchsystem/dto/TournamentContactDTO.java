package com.footballmatchsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TournamentContactDTO {
    private String name;
    private String email;
    private String phone;
    private String role;
    private Boolean isPrimary;
}
