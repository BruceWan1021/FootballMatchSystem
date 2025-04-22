package com.footballmatchsystem.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "teams")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "short_name")
    private String shortName;

    @Column
    private String school;

    @Column(name = "home_stadium")
    private String homeStadium;

    @Column
    private LocalDate founded;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(name = "captain_name")
    private String captainName;

    @Column(name = "captain_id")
    private Long captainId;

    @Column
    private String contact;

    // 主场配色
    @Column(name = "home_jersey_color")
    private String homeJerseyColor;

    @Column(name = "home_shorts_color")
    private String homeShortsColor;

    @Column(name = "home_socks_color")
    private String homeSocksColor;

    // 客场配色
    @Column(name = "away_jersey_color")
    private String awayJerseyColor;

    @Column(name = "away_shorts_color")
    private String awayShortsColor;

    @Column(name = "away_socks_color")
    private String awaySocksColor;

    @Column(columnDefinition = "TEXT")
    private String description;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;


    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @ManyToMany
    @JoinTable(
            name = "team_tournament",
            joinColumns = @JoinColumn(name = "team_id"),
            inverseJoinColumns = @JoinColumn(name = "tournament_id"))
    private Set<Tournament> tournaments;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserTeamRole> userRoles = new HashSet<>();

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TeamContact> contacts;


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

    public String getHomeStadium() {
        return homeStadium;
    }

    public void setHomeStadium(String homeStadium) {
        this.homeStadium = homeStadium;
    }

    public LocalDate getFounded() {
        return founded;
    }

    public void setFounded(LocalDate founded) {
        this.founded = founded;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public String getCaptainName() {
        return captainName;
    }

    public void setCaptainName(String captainName) {
        this.captainName = captainName;
    }

    public Long getCaptainId() {
        return captainId;
    }

    public void setCaptainId(Long captainId) {
        this.captainId = captainId;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Set<Tournament> getTournaments() {
        return tournaments;
    }

    public void setTournaments(Set<Tournament> tournaments) {
        this.tournaments = tournaments;
    }

    public Set<UserTeamRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(Set<UserTeamRole> userRoles) {
        this.userRoles = userRoles;
    }

    public List<TeamContact> getContacts() {
        return contacts;
    }

    public void setContacts(List<TeamContact> contacts) {
        this.contacts = contacts;
    }
}
