package com.footballmatchsystem.util.strategyimpl;

import com.footballmatchsystem.model.Match;
import com.footballmatchsystem.model.Team;
import com.footballmatchsystem.util.ScheduleConfig;
import com.footballmatchsystem.util.ScheduleStrategy;
import com.footballmatchsystem.util.generator.GroupStageGenerator;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GroupKnockoutStrategy implements ScheduleStrategy {

    @Override
    public List<Match> generateSchedule(List<Team> teams, ScheduleConfig config) {
        return GroupStageGenerator.generate(
                teams,
                config.groups(),
                config.advanceCount(),
                config.startDate(),
                config.intervalDays()
        );
    }

    @Override
    public ScheduleType getScheduleType() {
        return ScheduleType.GROUP_KNOCKOUT;
    }
}