package com.footballmatchsystem.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class MatchTeamInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "match_id")
    private Match match;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    private String formation; // 如 "4-4-2"

    @OneToMany(mappedBy = "matchTeamInfo", cascade = CascadeType.ALL)
    private List<MatchLineup> lineups;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Match getMatch() {
        return match;
    }

    public void setMatch(Match match) {
        this.match = match;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public String getFormation() {
        return formation;
    }

    public void setFormation(String formation) {
        this.formation = formation;
    }

    public List<MatchLineup> getLineups() {
        return lineups;
    }

    public void setLineups(List<MatchLineup> lineups) {
        this.lineups = lineups;
    }
}
