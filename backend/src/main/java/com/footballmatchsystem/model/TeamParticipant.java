package com.footballmatchsystem.model;

import jakarta.persistence.*;

@Entity
public class TeamParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Team team;
    @ManyToOne
    private User user;

    @Enumerated(EnumType.STRING)
    private JoinStatus status = JoinStatus.PENDING;

    public enum JoinStatus {
        PENDING,    // 等待审批
        APPROVED,   // 审批通过（正式加入）
        REJECTED    // 审批拒绝
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public JoinStatus getStatus() {
        return status;
    }

    public void setStatus(JoinStatus status) {
        this.status = status;
    }
}