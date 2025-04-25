package com.footballmatchsystem.dto;

import lombok.Data;

import java.util.List;

@Data
public class MatchTeamInfoDTO {
    private Long teamId;
    private String teamName;
    private String formation; // e.g., "4-4-2"
    private List<MatchPlayerLineupDTO> lineup; // 阵容列表
}
