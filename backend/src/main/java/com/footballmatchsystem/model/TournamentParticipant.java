package com.footballmatchsystem.model;

import jakarta.persistence.*;

@Entity
public class TournamentParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Tournament tournament;

    @ManyToOne
    private Team team;

    @Enumerated(EnumType.STRING)
    private JoinStatus status = JoinStatus.PENDING;


    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Tournament getTournament() {
        return tournament;
    }

    public void setTournament(Tournament tournament) {
        this.tournament = tournament;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public JoinStatus getStatus() {
        return status;
    }

    public void setStatus(JoinStatus status) {
        this.status = status;
    }

    public enum JoinStatus {
        PENDING,    // 等待审批
        APPROVED,   // 审批通过（正式加入）
        REJECTED    // 审批拒绝
    }

}

