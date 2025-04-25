package com.footballmatchsystem.util;

import java.time.LocalDate;

public record ScheduleConfig(
        LocalDate startDate,
        int intervalDays,
        boolean doubleRound,
        int groups,          // 分组数量(用于分组赛)
        int advanceCount,     // 晋级数量(用于淘汰赛)

        int rounds
) {
}
