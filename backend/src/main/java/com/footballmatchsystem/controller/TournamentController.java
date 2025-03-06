package com.footballmatchsystem.controller;

import com.footballmatchsystem.model.Tournament;
import com.footballmatchsystem.service.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tournaments")
public class TournamentController {

    @Autowired
    private TournamentService tournamentService;

    @GetMapping("/scheduled")
    public ResponseEntity<List<Tournament>> getTournaments(){
        List<Tournament> tournaments = tournamentService.getAllTournament();
        return ResponseEntity.ok(tournaments);
    }
}
