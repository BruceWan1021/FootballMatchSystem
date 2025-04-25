package com.footballmatchsystem.util.generator;

import com.footballmatchsystem.model.Match;
import com.footballmatchsystem.model.Team;
import com.footballmatchsystem.util.ScheduleConfig;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class RoundRobinGenerator {

    /**
     * 生成轮询赛程 (支持单/双循环)
     */
    public static List<Match> generate(List<Team> teams, ScheduleConfig config, boolean doubleRound) {
        validateInput(teams, config);

        List<Team> adjustedTeams = adjustTeamCount(new ArrayList<>(teams));
        int numTeams = adjustedTeams.size();
        int numRounds = numTeams - 1;

        List<Match> schedule = new ArrayList<>();
        generateRounds(adjustedTeams, config.startDate(), config.intervalDays(), numRounds, schedule);

        if (doubleRound) {
            generateSecondLeg(schedule, config.startDate(), config.intervalDays(), numRounds);
        }

        return schedule.stream()
                .filter(m -> !isByeMatch(m))
                .collect(Collectors.toList());
    }

    // 验证输入参数
    private static void validateInput(List<Team> teams, ScheduleConfig config) {
        if (teams == null || teams.size() < 2) {
            throw new IllegalArgumentException("至少需要2支球队");
        }
        if (config.intervalDays() < 1) {
            throw new IllegalArgumentException("比赛间隔天数不能小于1");
        }
    }

    // 调整球队数量为偶数
    private static List<Team> adjustTeamCount(List<Team> teams) {
        if (teams.size() % 2 != 0) {
            teams.add(createByeTeam());
        }
        return teams;
    }

    // 创建虚拟球队(Bye)
    private static Team createByeTeam() {
        return new Team((long) -1, "Bye", "Virtual Stadium");
    }

    // 判断是否为轮空比赛
    private static boolean isByeMatch(Match match) {
        return match.getTeam1().getId() == -1 || match.getTeam2().getId() == -1;
    }

    // 生成各轮比赛
    private static void generateRounds(List<Team> teams, LocalDate startDate,
                                       int intervalDays, int numRounds, List<Match> schedule) {
        for (int round = 0; round < numRounds; round++) {
            LocalDate matchDate = startDate.plusDays(round * intervalDays);
            generateRoundMatches(teams, round + 1, matchDate, schedule);
            rotateTeams(teams);
        }
    }

    // 生成单轮比赛
    private static void generateRoundMatches(List<Team> teams, int round,
                                             LocalDate date, List<Match> schedule) {
        int matchesPerRound = teams.size() / 2;
        for (int i = 0; i < matchesPerRound; i++) {
            Team home = teams.get(i);
            Team away = teams.get(teams.size() - 1 - i);

            if (!isByeTeam(home) && !isByeTeam(away)) {
                schedule.add(createMatch(home, away, round, date));
            }
        }
    }

    // 创建比赛对象
    private static Match createMatch(Team home, Team away, int round, LocalDate date) {
        return new Match(
                home,
                away,
                round,
                date.atTime(LocalTime.of(14, 0))
        );
    }

    // 判断是否为虚拟球队
    private static boolean isByeTeam(Team team) {
        return team.getId() == -1;
    }

    // 轮换球队位置
    private static void rotateTeams(List<Team> teams) {
        List<Team> rotated = new ArrayList<>();
        rotated.add(teams.get(0));
        rotated.add(teams.get(teams.size() - 1));
        rotated.addAll(teams.subList(1, teams.size() - 1));
        teams.clear();
        teams.addAll(rotated);
    }

    // 生成第二循环比赛
    private static void generateSecondLeg(List<Match> firstLeg, LocalDate startDate,
                                          int intervalDays, int numRounds) {
        List<Match> secondLeg = new ArrayList<>();

        for (int round = 0; round < numRounds; round++) {
            int currentRound = round + numRounds + 1;
            LocalDate matchDate = startDate.plusDays((currentRound - 1) * intervalDays);

            int finalRound = round + 1;
            firstLeg.stream()
                    .filter(m -> m.getRound() == finalRound)
                    .forEach(m -> secondLeg.add(createReturnMatch(m, currentRound, matchDate)));
        }

        firstLeg.addAll(secondLeg);
    }

    // 创建第二循环回合比赛
    private static Match createReturnMatch(Match firstLegMatch, int round, LocalDate date) {
        return new Match(
                firstLegMatch.getTeam2(),
                firstLegMatch.getTeam1(),
                round,
                date.atTime(LocalTime.of(19, 30))
        );
    }
}