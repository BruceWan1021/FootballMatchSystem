package com.footballmatchsystem.service.impl;

import com.footballmatchsystem.dto.LineupRequest;
import com.footballmatchsystem.model.MatchLineup;
import com.footballmatchsystem.model.MatchTeamInfo;
import com.footballmatchsystem.model.PlayerProfile;
import com.footballmatchsystem.model.User;
import com.footballmatchsystem.repository.MatchTeamInfoRepository;
import com.footballmatchsystem.repository.PlayerProfileRepository;
import com.footballmatchsystem.service.MatchTeamInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MatchTeamInfoServiceImpl implements MatchTeamInfoService {

    @Autowired
    private MatchTeamInfoRepository matchTeamInfoRepository;

    @Autowired
    private PlayerProfileRepository playerRepository;

    @Override
    public void saveLineup(Long matchId, Long teamId, List<LineupRequest> lineupRequest) {
        // 查询比赛和球队相关信息
        Optional<MatchTeamInfo> matchTeamInfoOptional = Optional.ofNullable(matchTeamInfoRepository.findByMatchIdAndTeamId(matchId, teamId));

        if (!matchTeamInfoOptional.isPresent()) {
            throw new IllegalArgumentException("未找到该比赛和球队的匹配记录");
        }

        MatchTeamInfo matchTeamInfo = matchTeamInfoOptional.get();

        // 更新阵容
        for (LineupRequest request : lineupRequest) {
            // 处理每个球员的阵容数据
            PlayerProfile player = playerRepository.findById(request.getPlayerId())
                    .orElseThrow(() -> new IllegalArgumentException("未找到球员: " + request.getPlayerId()));

            // 根据是否为首发球员，更新球员的阵容信息
            if (request.isStarting()) {
                matchTeamInfo.addStartingPlayer(player, MatchLineup.Position.valueOf(request.getPosition()));
            } else {
                matchTeamInfo.addSubstitutePlayer(player, MatchLineup.Position.valueOf(request.getPosition()));
            }
        }

        // 保存更新后的阵容
        matchTeamInfoRepository.save(matchTeamInfo);
    }

    @Override
    public MatchTeamInfo getLastLineup(Long teamId) {
        Optional<MatchTeamInfo> matchTeamInfo = matchTeamInfoRepository
                .findMostRecentMatchTeamInfoByTeamId(teamId); // 按照比赛日期倒序排序

        return matchTeamInfo.orElse(null);
    }

}
