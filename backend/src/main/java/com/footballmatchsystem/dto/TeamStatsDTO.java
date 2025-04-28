package com.footballmatchsystem.dto;

import lombok.Data;

@Data
public class TeamStatsDTO {

    private Long teamId;  // 队伍ID
    private String teamName; // 队伍名称
    private String teamLogo; // 队伍Logo
    private int matchesPlayed; // 比赛场次
    private int wins; // 胜场数
    private int draws; // 平局数
    private int losses; // 负场数
    private int goalsFor; // 进球数
    private int goalsAgainst; // 失球数
    private int points; // 积分
    private double winRate;
}
