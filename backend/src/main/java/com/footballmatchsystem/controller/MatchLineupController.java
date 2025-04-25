package com.footballmatchsystem.controller;

import com.footballmatchsystem.dto.MatchPlayerLineupDTO;
import com.footballmatchsystem.exception.BusinessException;
import com.footballmatchsystem.mapper.MatchMapper;
import com.footballmatchsystem.model.MatchLineup;
import com.footballmatchsystem.service.LineupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/lineups")
@RequiredArgsConstructor
public class MatchLineupController {

    private final LineupService lineupService;

    @PostMapping("/{matchTeamInfoId}")
    public ResponseEntity<?> saveLineup(
            @PathVariable Long matchTeamInfoId,
            @RequestBody List<MatchPlayerLineupDTO> lineupDTOs) {
        try {
            List<MatchLineup> savedLineups = lineupService.saveLineup(matchTeamInfoId, lineupDTOs);
            List<MatchPlayerLineupDTO> result = savedLineups.stream()
                    .map(MatchMapper::toPlayerLineupDTO)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(result);
        } catch (BusinessException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{matchTeamInfoId}")
    public ResponseEntity<?> getLineup(@PathVariable Long matchTeamInfoId) {
        try {
            List<MatchLineup> lineups = lineupService.getLineupByMatchTeam(matchTeamInfoId);
            List<MatchPlayerLineupDTO> result = lineups.stream()
                    .map(MatchMapper::toPlayerLineupDTO)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(result);
        } catch (BusinessException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
