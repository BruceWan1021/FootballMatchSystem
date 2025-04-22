package com.footballmatchsystem.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class TeamDTO {

    private Long id;
    private String name;
    private String shortName;
    private String school;
    private String homeStadium;
    private LocalDate founded;
    private String logoUrl;
    private String homeJerseyColor;
    private String homeShortsColor;
    private String homeSocksColor;
    private String awayJerseyColor;
    private String awayShortsColor;
    private String awaySocksColor;
    private String description;
    private List<TeamContactDTO> contacts;
}
