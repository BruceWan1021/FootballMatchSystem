package com.footballmatchsystem.util;

import com.footballmatchsystem.model.Match;
import com.footballmatchsystem.model.Team;

import java.util.List;

/**
 * 赛程生成策略接口
 */
public interface ScheduleStrategy {

    /**
     * 生成比赛日程
     */
    List<Match> generateSchedule(List<Team> teams, ScheduleConfig config);

    /**
     * 获取策略类型
     */
    ScheduleType getScheduleType();

    /**
     * 赛制类型枚举 (与前端保持一致)
     */
    enum ScheduleType {
        SINGLE_ROUND_ROBIN("单循环"),
        DOUBLE_ROUND_ROBIN("双循环"),
        SINGLE_ELIMINATION("单败淘汰"),
        GROUP_KNOCKOUT("分组+淘汰"),
        LEAGUE_PLAYOFFS("联赛+季后赛"),
        SWISS_SYSTEM("瑞士制");

        private final String displayName;

        ScheduleType(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }
}