package com.footballmatchsystem.util;

import com.footballmatchsystem.model.Match;
import com.footballmatchsystem.model.Team;

import java.util.*;
import java.util.stream.Collectors;

public class GroupPointUtils {

    /**
     * 根据真实比赛结果，按小组计算积分并选出每组晋级球队
     *
     * @param matches 全部小组赛 Match（必须包含 groupId、比分）
     * @param advanceCount 每组晋级球队数量
     * @return 所有晋级球队列表
     */
    public static List<Team> getAdvancedTeams(List<Match> matches, int advanceCount) {
        Map<String, List<Match>> matchesByGroup = matches.stream()
                .filter(m -> m.getGroupId() != null)
                .collect(Collectors.groupingBy(Match::getGroupId));

        List<Team> advancedTeams = new ArrayList<>();

        for (Map.Entry<String, List<Match>> entry : matchesByGroup.entrySet()) {
            String groupId = entry.getKey();
            List<Match> groupMatches = entry.getValue();

            // 初始化积分表
            Map<Team, Integer> points = new HashMap<>();

            for (Match match : groupMatches) {
                Team t1 = match.getTeam1();
                Team t2 = match.getTeam2();
                int s1 = match.getScore1();
                int s2 = match.getScore2();

                points.putIfAbsent(t1, 0);
                points.putIfAbsent(t2, 0);

                if (s1 > s2) {
                    points.put(t1, points.get(t1) + 3);
                } else if (s1 < s2) {
                    points.put(t2, points.get(t2) + 3);
                } else {
                    points.put(t1, points.get(t1) + 1);
                    points.put(t2, points.get(t2) + 1);
                }
            }

            // 排名取前 N 名
            List<Team> topTeams = points.entrySet().stream()
                    .sorted((a, b) -> Integer.compare(b.getValue(), a.getValue()))
                    .limit(advanceCount)
                    .map(Map.Entry::getKey)
                    .collect(Collectors.toList());

            advancedTeams.addAll(topTeams);
        }

        return advancedTeams;
    }
}
