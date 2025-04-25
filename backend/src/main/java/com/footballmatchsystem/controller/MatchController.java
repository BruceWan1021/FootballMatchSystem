package com.footballmatchsystem.controller;

import com.footballmatchsystem.dto.MatchDTO;
import com.footballmatchsystem.mapper.MatchMapper;
import com.footballmatchsystem.model.Match;
import com.footballmatchsystem.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
public class MatchController {

    @Autowired
    private MatchService matchService;


    @GetMapping("/all")
    public ResponseEntity<List<MatchDTO>> getMatches() {
        List<MatchDTO> matches = matchService.getMatches()
                .stream()
                .map(MatchMapper::toDTO)
                .toList();
        return ResponseEntity.ok(matches);
    }

    @GetMapping("{id}")
    public ResponseEntity<MatchDTO> getMatchDetails(@PathVariable Long id) {
        return matchService.getMatchById(id)
                .map(MatchMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @GetMapping("/scheduled")
    public ResponseEntity<List<MatchDTO>> getScheduleMatches() {
        List<MatchDTO> scheduledMatches = matchService.getScheduledMatches()
                .stream()
                .map(MatchMapper::toDTO) // 使用统一的 DTO 转换器
                .toList();
        return ResponseEntity.ok(scheduledMatches);
    }

    @PutMapping("/{matchId}")
    public ResponseEntity<?> updateMatch(@PathVariable Long matchId, @RequestBody MatchDTO matchDTO) {
        try {
            // Call service to update the match
            Match updatedMatch = matchService.updateMatch(matchId, matchDTO);

            if (updatedMatch == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(updatedMatch);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to update match: " + e.getMessage());
        }
    }

    @PutMapping("/{matchId}/in-progress")
    public ResponseEntity<MatchDTO> updateMatchStatusToInProgress(@PathVariable Long matchId){
        Match updatedMatch = matchService.updateMatchStatusToInProgress(matchId);
        return ResponseEntity.ok(MatchMapper.toDTO(updatedMatch));
    }

    @PutMapping("/{matchId}/completed")
    public ResponseEntity<MatchDTO> updateMatchStatusToCompleted(@PathVariable Long matchId){
        Match updatedMatch = matchService.updateMatchStatusToCompleted(matchId);
        return ResponseEntity.ok(MatchMapper.toDTO(updatedMatch));
    }

    @PostMapping
    public ResponseEntity<MatchDTO> createMatch(@RequestBody Match match){
        Match createdMatch = matchService.createMatch(match);
        return ResponseEntity.status(HttpStatus.CREATED).body(MatchMapper.toDTO(createdMatch));
    }

    @GetMapping("/tournaments/{id}")
    public ResponseEntity<List<MatchDTO>> getMatches(@PathVariable Long id) {
        List<MatchDTO> matchList = matchService.getMatchesByTournamentId(id);
        return ResponseEntity.ok(matchList);
    }

    @GetMapping("/teams/{id}")
    public ResponseEntity<List<MatchDTO>> getMatchesByTeam(@PathVariable Long id) {
        List<MatchDTO> matchList = matchService.getMatchesByTeamId(id);
        return ResponseEntity.ok(matchList);
    }


}
