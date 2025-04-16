package com.footballmatchsystem.controller;

import com.footballmatchsystem.dto.TournamentDTO;
import com.footballmatchsystem.service.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

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

    // 获取所有 Tournament
    @GetMapping
    public ResponseEntity<List<TournamentDTO>> getAllTournaments() {
        return ResponseEntity.ok(tournamentService.getAllTournaments());
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
        tournamentService.joinTournamentByUsername(id, username);
        return ResponseEntity.ok("Team joined successfully");
    }
}
