package com.footballmatchsystem.dto;

import com.footballmatchsystem.model.Tournament;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class TournamentDTO {
    private Long id;
    private String name;
    private String shortName;
    private String hostSchool;
    private String season;
    private String description;
    private String logoUrl;
    private LocalDateTime signupStart;
    private LocalDateTime signupEnd;
    private LocalDateTime leagueStart;
    private LocalDateTime leagueEnd;
    private Integer minTeams;
    private Integer maxTeams;
    private Integer minPlayersPerTeam;
    private Integer maxPlayersPerTeam;
    private String matchFormat;
    private String customFormatDescription;
    private Integer gameDuration;
    private String location;
    private Tournament.AgeGroup ageGroup;
    private Tournament.Gender gender;
    private String contactEmail;
    private String contactPhone;
    private List<TournamentContactDTO> contacts;
    private List<String> equipmentRequired;
    private List<String> awards;
    private String cancellationPolicy;
    private Boolean isPublic;
    private Boolean requiresApproval;
    private String ruleAttachmentUrl;
}
