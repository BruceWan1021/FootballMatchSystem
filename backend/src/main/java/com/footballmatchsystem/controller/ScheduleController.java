package com.footballmatchsystem.controller;

import com.footballmatchsystem.dto.ScheduleRequest;
import com.footballmatchsystem.model.Match;
import com.footballmatchsystem.model.Team;
import com.footballmatchsystem.model.Tournament;
import com.footballmatchsystem.repository.TournamentRepository;
import com.footballmatchsystem.service.MatchService;
import com.footballmatchsystem.util.ScheduleConfig;
import com.footballmatchsystem.util.ScheduleFactory;
import com.footballmatchsystem.util.ScheduleStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    private final ScheduleFactory scheduleFactory;
    private final MatchService matchService;
    private final TournamentRepository tournamentRepository;

    @Autowired
    public ScheduleController(ScheduleFactory scheduleFactory, MatchService matchService, TournamentRepository tournamentRepository) {
        this.scheduleFactory = scheduleFactory;
        this.matchService = matchService;
        this.tournamentRepository = tournamentRepository;
    }

    /**
     * 根据赛制类型生成赛程
     * @param type 如 "roundrobin"、"knockout"、"groupknockout"
     */
    @PostMapping("/generate/{type}")
    public ResponseEntity<List<Match>> generateSchedule(
            @PathVariable String type,
            @RequestBody ScheduleRequest request
    ) {
        List<Team> teams = IntStream.range(0, request.teamIds().size())
                .mapToObj(i -> new Team(
                        request.teamIds().get(i),
                        request.teamNames().get(i),
                        request.homeStadiums().get(i)
                ))
                .collect(Collectors.toList());

        ScheduleConfig config = new ScheduleConfig(
                request.startDate(),
                request.intervalDays(),
                request.doubleRound(),
                request.groups(),
                request.advanceCount(),
                request.rounds()
        );

        ScheduleStrategy strategy = scheduleFactory.getStrategy(type);
        List<Match> generatedMatches = strategy.generateSchedule(teams, config);

        Tournament tournament = tournamentRepository.findById(request.tournamentId())
                .orElseThrow(() -> new IllegalArgumentException("无效的 tournamentId"));

        List<Match> savedMatches = new ArrayList<>();
        for (Match match : generatedMatches) {
            match.setTournament(tournament);
            Match savedMatch = matchService.createMatch(match);
            savedMatches.add(savedMatch);
        }

        return ResponseEntity.ok(savedMatches);
    }

    /**
     * 获取所有支持的赛制类型
     */
    @GetMapping("/types")
    public ResponseEntity<List<String>> getAvailableScheduleTypes() {
        return ResponseEntity.ok(
                scheduleFactory.getSupportedTypes().stream().sorted().collect(Collectors.toList())
        );
    }
}
