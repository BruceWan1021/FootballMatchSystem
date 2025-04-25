package com.footballmatchsystem.util.strategyimpl;

import com.footballmatchsystem.model.Match;
import com.footballmatchsystem.model.Team;
import com.footballmatchsystem.util.ScheduleConfig;
import com.footballmatchsystem.util.ScheduleStrategy;
import com.footballmatchsystem.util.generator.SwissPairingEngine;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SwissSystemStrategy implements ScheduleStrategy {

    @Override
    public List<Match> generateSchedule(List<Team> teams, ScheduleConfig config) {
        return SwissPairingEngine.generate(
                teams,
                config.rounds(),
                config.startDate(),
                config.intervalDays()
        );
    }

    @Override
    public ScheduleType getScheduleType() {
        return ScheduleType.SWISS_SYSTEM;
    }
}
