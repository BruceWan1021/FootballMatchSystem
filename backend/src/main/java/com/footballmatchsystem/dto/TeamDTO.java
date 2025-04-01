package com.footballmatchsystem.dto;

import java.time.LocalDate;

public class TeamDTO {

    private Long id;
    private String name;
    private String shortName;
    private String school;
    private LocalDate founded;
    private String logoUrl;
    private String homeJerseyColor;
    private String homeShortsColor;
    private String homeSocksColor;
    private String awayJerseyColor;
    private String awayShortsColor;
    private String awaySocksColor;
    private String description;

    // === Getters & Setters ===

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public LocalDate getFounded() {
        return founded;
    }

    public void setFounded(LocalDate founded) {
        this.founded = founded;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public String getHomeJerseyColor() {
        return homeJerseyColor;
    }

    public void setHomeJerseyColor(String homeJerseyColor) {
        this.homeJerseyColor = homeJerseyColor;
    }

    public String getHomeShortsColor() {
        return homeShortsColor;
    }

    public void setHomeShortsColor(String homeShortsColor) {
        this.homeShortsColor = homeShortsColor;
    }

    public String getHomeSocksColor() {
        return homeSocksColor;
    }

    public void setHomeSocksColor(String homeSocksColor) {
        this.homeSocksColor = homeSocksColor;
    }

    public String getAwayJerseyColor() {
        return awayJerseyColor;
    }

    public void setAwayJerseyColor(String awayJerseyColor) {
        this.awayJerseyColor = awayJerseyColor;
    }

    public String getAwayShortsColor() {
        return awayShortsColor;
    }

    public void setAwayShortsColor(String awayShortsColor) {
        this.awayShortsColor = awayShortsColor;
    }

    public String getAwaySocksColor() {
        return awaySocksColor;
    }

    public void setAwaySocksColor(String awaySocksColor) {
        this.awaySocksColor = awaySocksColor;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
