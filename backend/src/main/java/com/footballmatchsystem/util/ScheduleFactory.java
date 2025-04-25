package com.footballmatchsystem.util;

import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ScheduleFactory {

    private final Map<ScheduleStrategy.ScheduleType, ScheduleStrategy> strategyMap;

    public ScheduleFactory(List<ScheduleStrategy> strategyList) {
        strategyMap = strategyList.stream()
                .collect(Collectors.toMap(
                        ScheduleStrategy::getScheduleType,
                        Function.identity()
                ));
    }

    public ScheduleStrategy getStrategy(String type) {
        try {
            ScheduleStrategy.ScheduleType scheduleType = ScheduleStrategy.ScheduleType.valueOf(type.toUpperCase());
            return Optional.ofNullable(strategyMap.get(scheduleType))
                    .orElseThrow(() -> new IllegalArgumentException("找不到策略: " + type));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("未知的赛制类型: " + type);
        }
    }

    public List<String> getSupportedTypes() {
        return strategyMap.keySet().stream()
                .map(Enum::name)
                .toList();
    }
}