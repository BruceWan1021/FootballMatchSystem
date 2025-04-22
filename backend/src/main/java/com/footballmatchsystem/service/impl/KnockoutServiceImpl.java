package com.footballmatchsystem.service.impl;

import com.footballmatchsystem.model.*;
import com.footballmatchsystem.repository.MatchRepository;
import com.footballmatchsystem.repository.TeamRepository;
import com.footballmatchsystem.repository.TournamentParticipantRepository;
import com.footballmatchsystem.repository.TournamentRepository;
import com.footballmatchsystem.service.KnockoutService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class KnockoutServiceImpl implements KnockoutService {

    @Autowired
    private TournamentRepository tournamentRepository;

    @Autowired
    private TournamentParticipantRepository participantRepository;

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Override
    @Transactional
    public List<Match> generateFirstRound(Long tournamentId) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));

        List<Team> allTeams = participantRepository.findApprovedTeamsByTournamentId(tournamentId);
        if (allTeams.size() < 2) {
            throw new IllegalStateException("At least two teams are required");
        }

        int totalTeams = allTeams.size();
        int nextPowerOfTwo = Integer.highestOneBit(totalTeams - 1) << 1;
        int byes = nextPowerOfTwo - totalTeams;

        Collections.shuffle(allTeams);
        List<Team> byeTeams = allTeams.subList(0, byes);
        List<Team> toPlay = allTeams.subList(byes, totalTeams);

        List<Match> result = new ArrayList<>();

        for (Team team : byeTeams) {
            Match byeMatch = new Match();
            byeMatch.setTournament(tournament);
            byeMatch.setTeam1(team);
            byeMatch.setTeam2(null);
            byeMatch.setMatchDate(LocalDateTime.now());
            byeMatch.setStatus(MatchStatus.COMPLETED);
            byeMatch.setScore1(1);
            byeMatch.setScore2(0);
            byeMatch.setRound(1);
            result.add(matchRepository.save(byeMatch));
        }

        for (int i = 0; i < toPlay.size(); i += 2) {
            Team t1 = toPlay.get(i);
            Team t2 = (i + 1 < toPlay.size()) ? toPlay.get(i + 1) : null;

            Match match = new Match();
            match.setTournament(tournament);
            match.setTeam1(t1);
            match.setTeam2(t2);
            match.setRound(1);
            match.setStatus(t2 == null ? MatchStatus.COMPLETED : MatchStatus.SCHEDULED);
            match.setMatchDate(LocalDateTime.now().plusDays(i));
            if (t2 == null) {
                match.setScore1(1);
                match.setScore2(0);
            }
            result.add(matchRepository.save(match));
        }

        return result;
    }

    @Override
    @Transactional
    public Match completeMatchAndAdvance(Long matchId) {
        Match match = matchRepository.findById(matchId)
                .orElseThrow(() -> new RuntimeException("Match not found"));

        match.setStatus(MatchStatus.COMPLETED);
        matchRepository.save(match);

        Tournament tournament = match.getTournament();
        List<Match> completedMatches = matchRepository.findByTournamentIdAndStatus(tournament.getId(), MatchStatus.COMPLETED);

        Map<Integer, List<Match>> matchesByRound = new TreeMap<>();
        for (Match m : completedMatches) {
            matchesByRound.computeIfAbsent(m.getRound(), k -> new ArrayList<>()).add(m);
        }

        int currentRound = matchesByRound.keySet().stream().max(Integer::compareTo).orElse(0);
        List<Match> lastRoundMatches = matchesByRound.get(currentRound);

        if (lastRoundMatches == null || lastRoundMatches.stream().anyMatch(m -> m.getStatus() != MatchStatus.COMPLETED)) {
            return match;
        }

        List<Team> winners = new ArrayList<>();
        for (Match m : lastRoundMatches) {
            if (m.getTeam2() == null || m.getScore1() > m.getScore2()) {
                winners.add(m.getTeam1());
            } else {
                winners.add(m.getTeam2());
            }
        }

        for (int i = 0; i < winners.size(); i += 2) {
            Team t1 = winners.get(i);
            Team t2 = (i + 1 < winners.size()) ? winners.get(i + 1) : null;

            Match nextMatch = new Match();
            nextMatch.setTournament(tournament);
            nextMatch.setTeam1(t1);
            nextMatch.setTeam2(t2);
            nextMatch.setRound(currentRound + 1);
            nextMatch.setStatus(t2 == null ? MatchStatus.COMPLETED : MatchStatus.SCHEDULED);
            nextMatch.setMatchDate(LocalDateTime.now().plusDays(currentRound));
            if (t2 == null) {
                nextMatch.setScore1(1);
                nextMatch.setScore2(0);
            }
            matchRepository.save(nextMatch);
        }

        return match;
    }
}