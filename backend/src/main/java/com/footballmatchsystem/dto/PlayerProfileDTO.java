package com.footballmatchsystem.dto;

import lombok.Data;

@Data
public class PlayerProfileDTO {
    private Long userId;
    private String username;
    private String avatarUrl;
    private String position;
    private int number;
    private int height;
    private int weight;
    private Long teamId;
    private String teamName;
}
