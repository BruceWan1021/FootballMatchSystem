package com.footballmatchsystem.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "matches")
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "round")
    private Integer round;

    @ManyToOne
    @JoinColumn(name = "team_1_id", nullable = false)
    private Team team1;

    @ManyToOne
    @JoinColumn(name = "team_2_id", nullable = false)
    private Team team2;

    @Column(name = "match_date", nullable = false)
    private LocalDateTime matchDate;

    @Column(name = "score_1", nullable = false)
    private int score1;

    @Column(name = "score_2", nullable = false)
    private int score2;

    @Column(name = "stadium")
    private String stadium;

    @Column(name = "group_id")
    private String groupId;

    @ManyToOne
    @JoinColumn(name = "winner_id")
    private Team winner;

    @ManyToOne
    @JoinColumn(name = "loser_id")
    private Team loser;

    @Column(name = "next_match_id")
    private Integer nextMatchId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MatchStatus status;

    @ManyToOne
    @JoinColumn(name = "tournament_id")
    private Tournament tournament;

    @ManyToOne
    @JoinColumn(name = "home_team_info_id")
    private MatchTeamInfo homeTeamInfo;

    @ManyToOne
    @JoinColumn(name = "away_team_info_id")
    private MatchTeamInfo awayTeamInfo;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructor, getters, and setters
    public Match() {}

    public Match(Team team1, Team team2, Integer round, LocalDateTime matchDate) {
        this.team1 = team1;
        this.team2 = team2;
        this.round = round;
        this.matchDate = matchDate;
    }

    public MatchTeamInfo getHomeTeamInfo() {
        return homeTeamInfo;
    }

    public void setHomeTeamInfo(MatchTeamInfo homeTeamInfo) {
        this.homeTeamInfo = homeTeamInfo;
    }

    public MatchTeamInfo getAwayTeamInfo() {
        return awayTeamInfo;
    }

    public void setAwayTeamInfo(MatchTeamInfo awayTeamInfo) {
        this.awayTeamInfo = awayTeamInfo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRound() {
        return round;
    }

    public void setRound(Integer round) {
        this.round = round;
    }

    public Team getTeam1() {
        return team1;
    }

    public void setTeam1(Team team1) {
        this.team1 = team1;
    }

    public Team getTeam2() {
        return team2;
    }

    public void setTeam2(Team team2) {
        this.team2 = team2;
    }

    public LocalDateTime getMatchDate() {
        return matchDate;
    }

    public void setMatchDate(LocalDateTime matchDate) {
        this.matchDate = matchDate;
    }

    public int getScore1() {
        return score1;
    }

    public void setScore1(int score1) {
        this.score1 = score1;
    }

    public int getScore2() {
        return score2;
    }

    public void setScore2(int score2) {
        this.score2 = score2;
    }

    public String getStadium() {
        return stadium;
    }

    public void setStadium(String stadium) {
        this.stadium = stadium;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public Team getWinner() {
        return winner;
    }

    public void setWinner(Team winner) {
        this.winner = winner;
    }

    public Team getLoser() {
        return loser;
    }

    public void setLoser(Team loser) {
        this.loser = loser;
    }

    public Integer getNextMatchId() {
        return nextMatchId;
    }

    public void setNextMatchId(Integer nextMatchId) {
        this.nextMatchId = nextMatchId;
    }

    public MatchStatus getStatus() {
        return status;
    }

    public void setStatus(MatchStatus status) {
        this.status = status;
    }

    public Tournament getTournament() {
        return tournament;
    }

    public void setTournament(Tournament tournament) {
        this.tournament = tournament;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
