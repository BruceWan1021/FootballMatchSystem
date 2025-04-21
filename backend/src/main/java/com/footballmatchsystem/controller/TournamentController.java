package com.footballmatchsystem.controller;

import com.footballmatchsystem.dto.TournamentDTO;
import com.footballmatchsystem.model.Match;
import com.footballmatchsystem.service.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tournaments")
public class TournamentController {

    @Autowired
    private TournamentService tournamentService;

    // 获取所有 Tournament
    @GetMapping("/all")
    public ResponseEntity<List<TournamentDTO>> getScheduledTournaments() {
        return ResponseEntity.ok(tournamentService.getAllTournaments());
    }

    // 创建 Tournament
    @PostMapping
    public ResponseEntity<TournamentDTO> createTournament(@RequestBody TournamentDTO tournamentDTO) {
        TournamentDTO created = tournamentService.createTournament(tournamentDTO);
        return ResponseEntity.created(URI.create("/api/tournaments/" + created.getId())).body(created);
    }

    @GetMapping("/my")
    public ResponseEntity<List<TournamentDTO>> getMyTournaments(Authentication authentication) {
        String username = authentication.getName();
        List<TournamentDTO> tournaments = tournamentService.getMyTournaments(username);
        return ResponseEntity.ok(tournaments);
    }

    // 获取所有 Tournament
    @GetMapping
    public ResponseEntity<List<TournamentDTO>> getAllTournaments() {
        return ResponseEntity.ok(tournamentService.getAllTournaments());
    }

    @GetMapping("/{id}/is-admin-or-creator")
    public ResponseEntity<Map<String, Boolean>> isAdminOrCreator(
            @PathVariable Long id,
            Authentication authentication) {

        String username = authentication.getName();
        boolean result = tournamentService.isAdminOrCreator(id, username);
        return ResponseEntity.ok(Collections.singletonMap("isAdminOrCreator", result));
    }

    // 获取指定 ID 的 Tournament
    @GetMapping("/{id}")
    public ResponseEntity<TournamentDTO> getTournamentById(@PathVariable Long id) {
        return tournamentService.getTournamentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 更新 Tournament
    @PutMapping("/{id}")
    public ResponseEntity<TournamentDTO> updateTournament(@PathVariable Long id, @RequestBody TournamentDTO updatedDTO) {
        return tournamentService.updateTournament(id, updatedDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 删除 Tournament
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTournament(@PathVariable Long id) {
        boolean deleted = tournamentService.deleteTournament(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    // 加入 Tournament
    @PostMapping("/{id}/join")
    public ResponseEntity<String> joinTournament(
            @PathVariable Long id,
            Authentication authentication) {

        String username = authentication.getName();
        String resultMessage = tournamentService.joinTournamentByUsername(id, username);
        return ResponseEntity.ok(resultMessage);
    }

    @PostMapping("/{id}/generate-schedule")
    public ResponseEntity<Map<String, Object>> generateSchedule(
            @PathVariable Long id,
            Authentication authentication) {

        String username = authentication.getName();

        boolean authorized = tournamentService.isAdminOrCreator(id, username);
        if (!authorized) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "You are not authorized to generate schedule."));
        }

        List<Match> matches = tournamentService.generateSchedule(id);
        return ResponseEntity.ok(Map.of(
                "message", "Match schedule generated successfully.",
                "matchCount", matches.size()
        ));
    }

}
