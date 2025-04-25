package com.footballmatchsystem.service.impl;

import com.footballmatchsystem.model.Match;
import com.footballmatchsystem.model.MatchStatus;
import com.footballmatchsystem.model.Team;
import com.footballmatchsystem.model.Tournament;
import com.footballmatchsystem.repository.MatchRepository;
import com.footballmatchsystem.repository.TeamRepository;
import com.footballmatchsystem.repository.TournamentRepository;
import com.footballmatchsystem.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ScheduleServiceImpl implements ScheduleService {

    @Autowired
    private TournamentRepository tournamentRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private MatchRepository matchRepository;

//    @Override
//    public List<Match> generateAndSaveRoundRobin(Long tournamentId, LocalDate startDate, int intervalDays, boolean doubleRound) {
//        Tournament tournament = tournamentRepository.findById(tournamentId)
//                .orElseThrow(() -> new RuntimeException("Tournament not found"));
//
//        List<Team> teams = tournament.getTeams();
//
//        List<RoundRobinScheduler.Team> simpleTeams = teams.stream()
//                .map(t -> new RoundRobinScheduler.Team(Math.toIntExact(t.getId()), t.getName(), t.getHomeStadium()))
//                .toList();
//
//        List<RoundRobinScheduler.Match> generated = RoundRobinScheduler.generateRoundRobinSchedule(
//                simpleTeams, startDate, intervalDays, doubleRound);
//
//        List<Match> matches = new ArrayList<>();
//        for (RoundRobinScheduler.Match m : generated) {
//            Match match = new Match();
//            match.setTournament(tournament);
//            match.setTeam1(findTeamById(m.homeTeam().id()));
//            match.setTeam2(findTeamById(m.awayTeam().id()));
//            match.setMatchDate(m.scheduledAt());
//            match.setScore1(0);
//            match.setScore2(0);
//            match.setStatus(MatchStatus.SCHEDULED);
//            matches.add(match);
//        }
//
//        return matchRepository.saveAll(matches);
//    }

    private Team findTeamById(long id) {
        return teamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Team not found: " + id));
    }
}
