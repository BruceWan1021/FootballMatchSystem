package com.footballmatchsystem.model;

import jakarta.persistence.*;

@Entity
@Table(name = "match_events")
public class MatchEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "match_id", nullable = false)
    private Match match;  // 关联的比赛

    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;

    @ManyToOne
    @JoinColumn(name = "player_id", nullable = false)
    private PlayerProfile player;  // 参与事件的球员

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EventType eventType;  // 事件类型

    @Column(name = "event_time", nullable = false)
    private Integer eventTime;  // 事件发生的比赛进行中的时间（分钟）

    @Column(name = "event_description")
    private String eventDescription;  // 事件描述（如进球、犯规等）

    @ManyToOne
    @JoinColumn(name = "assist_player_id")
    private PlayerProfile assistPlayer;  // 助攻球员（如果有）

    @ManyToOne
    @JoinColumn(name = "substitute_player_id")
    private PlayerProfile substitutePlayer;  // 替补球员（如果是换人事件）

    @Column(name = "score_1")
    private Integer score1;  // 比赛得分1（如果事件影响比分）

    @Column(name = "score_2")
    private Integer score2;  // 比赛得分2（如果事件影响比分）

    // Constructor, getters, and setters
    public MatchEvent() {}

    public MatchEvent(Match match, PlayerProfile player, EventType eventType, Integer eventTime, String eventDescription) {
        this.match = match;
        this.player = player;
        this.eventType = eventType;
        this.eventTime = eventTime;
        this.eventDescription = eventDescription;
    }

    // Getters and setters

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

    public PlayerProfile getPlayer() {
        return player;
    }

    public void setPlayer(PlayerProfile player) {
        this.player = player;
    }

    public EventType getEventType() {
        return eventType;
    }

    public void setEventType(EventType eventType) {
        this.eventType = eventType;
    }

    public Integer getEventTime() {
        return eventTime;
    }

    public void setEventTime(Integer eventTime) {
        this.eventTime = eventTime;
    }

    public String getEventDescription() {
        return eventDescription;
    }

    public void setEventDescription(String eventDescription) {
        this.eventDescription = eventDescription;
    }

    public PlayerProfile getAssistPlayer() {
        return assistPlayer;
    }

    public void setAssistPlayer(PlayerProfile assistPlayer) {
        this.assistPlayer = assistPlayer;
    }

    public PlayerProfile getSubstitutePlayer() {
        return substitutePlayer;
    }

    public void setSubstitutePlayer(PlayerProfile substitutePlayer) {
        this.substitutePlayer = substitutePlayer;
    }

    public Integer getScore1() {
        return score1;
    }

    public void setScore1(Integer score1) {
        this.score1 = score1;
    }

    public Integer getScore2() {
        return score2;
    }

    public void setScore2(Integer score2) {
        this.score2 = score2;
    }

    public enum EventType {
        GOAL,            // 进球
        ASSIST,          // 助攻
        YELLOW_CARD,     // 黄牌
        RED_CARD,        // 红牌
        SUBSTITUTION,    // 换人
        PENALTY,         // 点球
        EXTRA_TIME       // 加时赛
    }

}
