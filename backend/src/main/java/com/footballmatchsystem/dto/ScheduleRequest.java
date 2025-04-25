package com.footballmatchsystem.dto;

import java.time.LocalDate;
import java.util.List;

public record ScheduleRequest(
        List<Long> teamIds,
        List<String> teamNames,
        List<String> homeStadiums,
        LocalDate startDate,
        int intervalDays,
        boolean doubleRound,
        int groups,
        int advanceCount,
        int rounds,
        Long tournamentId
) {}
