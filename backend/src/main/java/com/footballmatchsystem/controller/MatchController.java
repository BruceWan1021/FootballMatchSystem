package com.footballmatchsystem.controller;

import com.footballmatchsystem.model.Match;
import com.footballmatchsystem.model.UserTournamentRole;
import com.footballmatchsystem.service.MatchService;
import com.footballmatchsystem.service.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/matches")
public class MatchController {

    @Autowired
    private MatchService matchService;
    @Autowired
    private TournamentService tournamentService;

    @GetMapping("/all")
    public ResponseEntity<List<Match>> getMatches(){
        List<Match> matches = matchService.getMatches();
        return ResponseEntity.ok(matches);
    }
    @GetMapping("/scheduled")
    public ResponseEntity<List<Match>> getScheduleMatches(){
        List<Match> scheduledMatches = matchService.getScheduledMatches();
        return ResponseEntity.ok(scheduledMatches);
    }

    @PutMapping("/{matchId}/in-progress")
    public ResponseEntity<Match> updateMatchStatusToInProgress(@PathVariable Long matchId){
        Match updateMatch = matchService.updateMatchStatusToInProgress(matchId);
        return ResponseEntity.ok(updateMatch);
    }

    @PutMapping("/{matchId}/completed")
    public ResponseEntity<Match> updateMatchStatusToCompleted(@PathVariable Long matchId){
        Match updateMatch = matchService.updateMatchStatusToCompleted(matchId);
        return ResponseEntity.ok(updateMatch);
    }

    @PostMapping
    public ResponseEntity<Match> createMatch(@RequestBody Match match){
        Match createdMatch = matchService.createMatch(match);
        return ResponseEntity.ok(createdMatch);
    }


}
