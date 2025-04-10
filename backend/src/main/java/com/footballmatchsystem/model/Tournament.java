package com.footballmatchsystem.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tournaments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tournament {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(name = "short_name", length = 50)
    private String shortName;

    @Column(name = "host_school", nullable = false, length = 100)
    private String hostSchool;

    @Column(length = 50)
    private String season;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "logo_url", length = 255)
    private String logoUrl;

    @Column(name = "signup_start")
    private LocalDateTime signupStart;

    @Column(name = "signup_end")
    private LocalDateTime signupEnd;

    @Column(name = "league_start")
    private LocalDateTime leagueStart;

    @Column(name = "league_end")
    private LocalDateTime leagueEnd;

    @Column(name = "min_teams")
    private Integer minTeams = 4;

    @Column(name = "max_teams")
    private Integer maxTeams = 8;

    @Column(name = "min_players_per_team")
    private Integer minPlayersPerTeam = 5;

    @Column(name = "max_players_per_team")
    private Integer maxPlayersPerTeam = 18;

    @Column(name = "match_format", nullable = false)
    private String matchFormat;

    @Column(name = "custom_format_description", columnDefinition = "TEXT")
    private String customFormatDescription;

    @Column(name = "game_duration")
    private Integer gameDuration = 60;

    @Column(nullable = false, length = 255)
    private String location;

    @Enumerated(EnumType.STRING)
    @Column(name = "age_group")
    private AgeGroup ageGroup;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender = Gender.MIXED;

    @Column(name = "equipment_required", columnDefinition = "TEXT")
    private String equipmentRequired;

    @Column(columnDefinition = "TEXT")
    private String awards;

    @Column(name = "cancellation_policy", columnDefinition = "TEXT")
    private String cancellationPolicy;

    @Column(name = "is_public")
    private Boolean isPublic = true;

    @Column(name = "requires_approval")
    private Boolean requiresApproval = false;

    @Column(name = "rule_attachment_url", length = 255)
    private String ruleAttachmentUrl;

    @OneToMany(mappedBy = "tournament", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TournamentContact> contacts;

    @ManyToMany(mappedBy = "tournaments")
    private List<Team> teams;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum AgeGroup {
        U12, U14, U16, U18, ADULT, OPEN
    }

    public enum Gender {
        MIXED, MALE, FEMALE
    }
}
