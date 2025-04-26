package com.footballmatchsystem.service;

import com.footballmatchsystem.dto.LineupRequest;
import com.footballmatchsystem.model.MatchTeamInfo;

import java.util.List;

public interface MatchTeamInfoService {

    /**
     * 保存阵容数据
     *
     * @param matchId      比赛ID
     * @param teamId       球队ID
     * @param lineupRequest 球员阵容数据
     * @throws IllegalArgumentException 如果没有找到对应的比赛或球队信息，或者保存过程中发生错误
     */
    void saveLineup(Long matchId, Long teamId, List<LineupRequest> lineupRequest) throws IllegalArgumentException;

    MatchTeamInfo getLastLineup(Long teamId);
}
