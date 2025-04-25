package com.footballmatchsystem.model;

import jakarta.persistence.*;

@Entity
public class MatchLineup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "match_team_info_id")
    private MatchTeamInfo matchTeamInfo;

    @ManyToOne
    @JoinColumn(name = "player_id")
    private PlayerProfile player;

    @Enumerated(EnumType.STRING)
    private Position position; // GK, DF, MF, FW

    private boolean isStarting; // true 为首发，false 为替补

    public enum Position {
        GK, DF, MF, FW
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MatchTeamInfo getMatchTeamInfo() {
        return matchTeamInfo;
    }

    public void setMatchTeamInfo(MatchTeamInfo matchTeamInfo) {
        this.matchTeamInfo = matchTeamInfo;
    }

    public PlayerProfile getPlayer() {
        return player;
    }

    public void setPlayer(PlayerProfile player) {
        this.player = player;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public boolean isStarting() {
        return isStarting;
    }

    public void setStarting(boolean starting) {
        isStarting = starting;
    }
}
