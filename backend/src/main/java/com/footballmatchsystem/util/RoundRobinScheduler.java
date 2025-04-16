package com.footballmatchsystem.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

public class RoundRobinScheduler {

    public record Team(int id, String name, String homeStadium) {}

    public record Match(Team homeTeam, Team awayTeam, int round, LocalDateTime scheduledAt, String stadium) {}

    public static List<Match> generateRoundRobinSchedule(List<Team> inputTeams, LocalDate startDate, int intervalDays, boolean doubleRound) {
        List<Team> teams = new ArrayList<>(inputTeams);
        if (teams.size() % 2 != 0) {
            teams.add(new Team(-1, "Bye", ""));
        }

        int numTeams = teams.size();
        int numRounds = numTeams - 1;
        int matchesPerRound = numTeams / 2;
        List<Match> schedule = new ArrayList<>();

        for (int round = 0; round < numRounds; round++) {
            for (int i = 0; i < matchesPerRound; i++) {
                Team home = teams.get(i);
                Team away = teams.get(numTeams - 1 - i);

                if (home.id() != -1 && away.id() != -1) {
                    LocalDate matchDate = startDate.plusDays((round * matchesPerRound + i) * intervalDays);
                    schedule.add(new Match(home, away, round + 1,
                            matchDate.atTime(LocalTime.of(14, 0)), home.homeStadium()));
                }
            }
            List<Team> rotated = new ArrayList<>();
            rotated.add(teams.get(0));
            rotated.add(teams.get(numTeams - 1));
            rotated.addAll(teams.subList(1, numTeams - 1));
            teams = rotated;
        }

        if (doubleRound) {
            int baseRound = numRounds;
            List<Match> secondLeg = new ArrayList<>();
            for (Match m : schedule) {
                LocalDate matchDate = m.scheduledAt().toLocalDate().plusDays(numRounds * intervalDays);
                secondLeg.add(new Match(
                        m.awayTeam(),
                        m.homeTeam(),
                        ++baseRound,
                        matchDate.atTime(LocalTime.of(14, 0)),
                        m.awayTeam().homeStadium()
                ));
            }
            schedule.addAll(secondLeg);
        }

        return schedule;
    }
}