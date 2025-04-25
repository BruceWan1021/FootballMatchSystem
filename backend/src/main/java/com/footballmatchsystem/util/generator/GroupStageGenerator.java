package com.footballmatchsystem.util.generator;

import com.footballmatchsystem.model.Match;
import com.footballmatchsystem.model.Team;
import com.footballmatchsystem.util.GroupPointUtils;
import com.footballmatchsystem.util.ScheduleConfig;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class GroupStageGenerator {

    /**
     * 生成分组赛 + 淘汰赛赛程
     */
    public static List<Match> generate(
            List<Team> teams,
            int groupCount,
            int advanceCount,
            LocalDate startDate,
            int intervalDays) {

        validateInput(teams, groupCount, advanceCount);

        // 1. 抽签分组
        List<List<Team>> groups = drawGroups(teams, groupCount);
        LocalDate groupStageEndDate = startDate.plusDays((groupCount - 1) * intervalDays);

        // 2. 生成小组循环赛赛程
        List<Match> groupMatches = generateGroupMatches(groups, startDate, intervalDays);

        // 3. 基于真实比分计算每组积分并晋级
        List<Team> advancedTeams = GroupPointUtils.getAdvancedTeams(groupMatches, advanceCount);

        // 4. 生成淘汰赛赛程
        LocalDate knockoutStartDate = groupStageEndDate.plusDays(7); // 小组赛后休息7天
        List<Match> knockoutMatches = EliminationGenerator.generateSingleElimination(
                advancedTeams,
                knockoutStartDate,
                intervalDays
        );

        // 5. 合并赛程
        List<Match> allMatches = new ArrayList<>();
        allMatches.addAll(groupMatches);
        allMatches.addAll(knockoutMatches);

        return allMatches;
    }

    // 校验基本参数
    private static void validateInput(List<Team> teams, int groupCount, int advanceCount) {
        if (teams.size() < groupCount * 2) {
            throw new IllegalArgumentException(
                    String.format("球队数量不足：至少需要 %d 队 (%d 组 × 每组至少 2 队)",
                            groupCount * 2, groupCount));
        }
        if (advanceCount < 1) {
            throw new IllegalArgumentException("晋级数量不能小于1");
        }
    }

    // 随机分组
    private static List<List<Team>> drawGroups(List<Team> teams, int groupCount) {
        List<Team> shuffled = new ArrayList<>(teams);
        Collections.shuffle(shuffled);

        return IntStream.range(0, groupCount)
                .mapToObj(i -> {
                    int from = i * (shuffled.size() / groupCount);
                    int to = (i + 1) * (shuffled.size() / groupCount);
                    return new ArrayList<>(shuffled.subList(from, to));
                })
                .collect(Collectors.toList());
    }

    // 为每组生成循环赛程
    private static List<Match> generateGroupMatches(
            List<List<Team>> groups,
            LocalDate startDate,
            int intervalDays) {

        List<Match> allGroupMatches = new ArrayList<>();

        for (int groupIndex = 0; groupIndex < groups.size(); groupIndex++) {
            List<Team> groupTeams = groups.get(groupIndex);
            LocalDate groupStartDate = startDate.plusDays(groupIndex * intervalDays);

            int rounds = groupTeams.size() - 1;

            ScheduleConfig config = new ScheduleConfig(
                    groupStartDate,
                    3,         // 每组内比赛间隔3天
                    false,     // 单循环
                    0,
                    0,
                    rounds
            );

            List<Match> groupMatches = RoundRobinGenerator.generate(
                    groupTeams,
                    config,
                    false
            );

            // 添加 groupId 标识（Group A, B, C...）
            int finalGroupIndex = groupIndex;
            groupMatches.forEach(m -> m.setGroupId("Group " + (char) ('A' + finalGroupIndex)));

            allGroupMatches.addAll(groupMatches);
        }

        return allGroupMatches;
    }
}
