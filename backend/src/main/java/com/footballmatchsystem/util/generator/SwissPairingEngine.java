package com.footballmatchsystem.util.generator;

import com.footballmatchsystem.model.Match;
import com.footballmatchsystem.model.Team;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

public class SwissPairingEngine {

    public static List<Match> generate(List<Team> teams, int totalRounds, LocalDate startDate, int intervalDays) {
        List<Match> matches = new ArrayList<>();
        Map<Team, Integer> scores = new HashMap<>();
        teams.forEach(team -> scores.put(team, 0));

        List<List<Team>> previousPairings = new ArrayList<>();

        for (int round = 1; round <= totalRounds; round++) {
            // 1. 排序：按当前分数降序
            List<Team> sorted = new ArrayList<>(teams);
            sorted.sort((a, b) -> scores.get(b) - scores.get(a));

            // 2. 生成配对
            List<Match> roundMatches = generateRoundMatches(sorted, round, startDate.plusDays((round - 1) * intervalDays));
            matches.addAll(roundMatches);
            previousPairings.add(new ArrayList<>(sorted));

            // 3. 模拟更新得分（实际应替换为真实比赛结果）
            for (Match match : roundMatches) {
                Team winner = Math.random() < 0.5 ? match.getTeam1() : match.getTeam2();
                scores.put(winner, scores.get(winner) + 1);
            }
        }

        return matches;
    }

    private static List<Match> generateRoundMatches(List<Team> teams, int round, LocalDate date) {
        List<Match> roundMatches = new ArrayList<>();
        Queue<Team> queue = new LinkedList<>(teams);

        while (queue.size() >= 2) {
            Team t1 = queue.poll();
            Team t2 = queue.poll();

            Match match = new Match(
                    t1,
                    t2,
                    round,
                    LocalDateTime.of(date, calculateMatchTime(round))
            );
            match.setGroupId("Swiss R" + round); // 可选标识
            roundMatches.add(match);
        }

        // 处理轮空（奇数个队）
        if (!queue.isEmpty()) {
            Team bye = queue.poll();
            // 可扩展处理轮空胜，例如加入虚拟比赛
        }

        return roundMatches;
    }

    private static LocalTime calculateMatchTime(int round) {
        return LocalTime.of(14 + round, 0); // 第1轮14点，第2轮15点...
    }
}
