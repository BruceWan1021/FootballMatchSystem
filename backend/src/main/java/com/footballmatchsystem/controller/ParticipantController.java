package com.footballmatchsystem.controller;

import com.footballmatchsystem.dto.TeamParticipantDTO;
import com.footballmatchsystem.dto.TournamentParticipantDTO;
import com.footballmatchsystem.mapper.TeamParticipantMapper;
import com.footballmatchsystem.mapper.TournamentParticipantMapper;
import com.footballmatchsystem.service.TeamParticipantService;
import com.footballmatchsystem.service.TournamentParticipantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/participant")
@RequiredArgsConstructor
public class ParticipantController {

    private final TournamentParticipantService tournamentParticipantService;
    private final TeamParticipantService teamParticipantService;

    // 查询指定锦标赛下所有参与者（包含状态）
    @GetMapping("/tournaments/{tournamentId}/participants")
    public List<TournamentParticipantDTO> getParticipants(@PathVariable Long tournamentId) {
        return tournamentParticipantService.getParticipantsByTournamentId(tournamentId)
                .stream()
                .map(TournamentParticipantMapper::toDTO)
                .toList();
    }

    // 审核参与者状态（通过/拒绝）
    @PutMapping("/tournaments/{tournamentId}/participants/{participantId}/status")
    public ResponseEntity<?> updateParticipantStatus(
            @PathVariable Long tournamentId,
            @PathVariable Long participantId,
            @RequestBody Map<String, String> request,
            Authentication authentication) {
        String username = authentication.getName();
        return tournamentParticipantService.updateParticipantStatus(tournamentId, participantId, request);
    }

    @GetMapping("/teams/{teamId}/participants")
    public List<TeamParticipantDTO> getTeamParticipants(@PathVariable Long teamId) {
        return teamParticipantService.getParticipantsByTeamId(teamId)
                .stream()
                .map(TeamParticipantMapper::toDTO)
                .toList();
    }

    // 审核参与者状态（通过/拒绝）
    @PutMapping("/teams/{teamId}/participants/{participantId}/status")
    public ResponseEntity<?> updateTeamParticipantStatus(
            @PathVariable Long teamId,
            @PathVariable Long participantId,
            @RequestBody Map<String, String> request,
            Authentication authentication) {
        String username = authentication.getName();
        return teamParticipantService.updateParticipantStatus(teamId, participantId, request);
    }
}
