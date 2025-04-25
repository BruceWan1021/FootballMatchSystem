package com.footballmatchsystem.util.strategyimpl;


import com.footballmatchsystem.model.Match;
import com.footballmatchsystem.model.Team;
import com.footballmatchsystem.util.ScheduleConfig;
import com.footballmatchsystem.util.ScheduleStrategy;
import com.footballmatchsystem.util.generator.RoundRobinGenerator;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SingleRoundRobinStrategy implements ScheduleStrategy {

    @Override
    public List<Match> generateSchedule(List<Team> teams, ScheduleConfig config) {
        return RoundRobinGenerator.generate(teams, config, false);
    }

    @Override
    public ScheduleType getScheduleType() {
        return ScheduleType.SINGLE_ROUND_ROBIN;
    }
}
