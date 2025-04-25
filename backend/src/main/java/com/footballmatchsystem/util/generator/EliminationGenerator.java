package com.footballmatchsystem.util.generator;

import com.footballmatchsystem.model.Match;
import com.footballmatchsystem.model.Team;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

public class EliminationGenerator {

    /**
     * 生成单败淘汰赛赛程
     *
     * @param teams        参赛球队列表
     * @param startDate    开始日期
     * @param intervalDays 比赛间隔天数
     * @return 按时间排序的比赛列表
     */
    public static List<Match> generateSingleElimination(
            List<Team> teams,
            LocalDate startDate,
            int intervalDays) {

        validateTeams(teams);
        int totalTeams = teams.size();
        int rounds = calculateTotalRounds(totalTeams);

        List<Match> matches = new ArrayList<>();
        Queue<Team> teamQueue = new LinkedList<>(teams);

        // 处理首轮轮空
        int byes = calculateByes(totalTeams);
        List<Team> advancedTeams = new ArrayList<>();

        // 首轮比赛（如果有轮空）
        if (byes > 0) {
            LocalDate firstRoundDate = startDate;
            for (int i = 0; i < byes; i++) {
                Team team = teamQueue.poll();
                advancedTeams.add(team); // 轮空球队自动晋级
            }

            // 首轮实际比赛场次
            int firstRoundMatches = (totalTeams - byes) / 2;
            generateRoundMatches(teamQueue, advancedTeams, 1, firstRoundDate, matches);
        }

        // 后续轮次
        for (int round = 2; round <= rounds; round++) {
            LocalDate roundDate = startDate.plusDays((round - 1) * intervalDays);
            Queue<Team> nextRoundTeams = new LinkedList<>(advancedTeams);
            advancedTeams.clear();
            generateRoundMatches(nextRoundTeams, advancedTeams, round, roundDate, matches);
        }

        // 季军赛
        generateThirdPlaceMatch(matches, startDate.plusDays(rounds * intervalDays));

        return matches;
    }

    // 验证球队数量
    private static void validateTeams(List<Team> teams) {
        if (teams.size() < 2) {
            throw new IllegalArgumentException("淘汰赛至少需要2支球队");
        }
    }

    // 计算总轮次
    private static int calculateTotalRounds(int teamCount) {
        return (int) Math.ceil(Math.log(teamCount) / Math.log(2));
    }

    // 计算轮空球队数量
    private static int calculateByes(int teamCount) {
        int nextPowerOfTwo = (int) Math.pow(2, Math.ceil(Math.log(teamCount) / Math.log(2)));
        return nextPowerOfTwo - teamCount;
    }

    // 生成单轮比赛
    private static void generateRoundMatches(
            Queue<Team> teamQueue,
            List<Team> advancedTeams,
            int round,
            LocalDate date,
            List<Match> matches) {

        while (teamQueue.size() >= 2) {
            Team home = teamQueue.poll();
            Team away = teamQueue.poll();

            Match match = new Match(
                    home,
                    away,
                    round,
                    date.atTime(calculateMatchTime(round))
            );

            matches.add(match);
            advancedTeams.add(null); // 占位，实际晋级球队需赛后确定
        }
    }

    // 计算比赛时间（后期轮次安排更晚的时间）
    private static LocalTime calculateMatchTime(int round) {
        return LocalTime.of(14 + (round * 2), 0); // 轮次越晚，时间越靠后
    }

    // 确定比赛场地
    private static String calculateStadium(Team home, Team away, int round) {
        return round <= 2 ? home.getHomeStadium() : "Neutral Stadium";
    }

    // 生成季军赛
    private static void generateThirdPlaceMatch(List<Match> matches, LocalDate date) {
        // 找到最大轮次的半决赛比赛
        int maxRound = matches.stream()
                .mapToInt(Match::getRound)
                .max()
                .orElseThrow(() -> new IllegalStateException("No matches found"));

        // 根据最大轮次减去1，找到半决赛比赛
        Match semiFinal1 = matches.stream()
                .filter(m -> m.getRound() == maxRound - 1)
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("Semi-final match not found"));

        // 根据轮次和前一个半决赛比赛，找到第二场半决赛
        Match semiFinal2 = matches.stream()
                .filter(m -> m.getRound() == semiFinal1.getRound() && m != semiFinal1)
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("Second semi-final match not found"));

        // 生成季军赛
        matches.add(new Match(
                semiFinal1.getLoser(), // 根据比赛结果确定
                semiFinal2.getLoser(),
                semiFinal1.getRound() + 1,
                date.atTime(14, 0)
        ));
    }
}