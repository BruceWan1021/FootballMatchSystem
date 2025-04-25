package com.footballmatchsystem.service.impl;

import com.footballmatchsystem.dto.MatchPlayerLineupDTO;
import com.footballmatchsystem.exception.BusinessException;
import com.footballmatchsystem.model.MatchLineup;
import com.footballmatchsystem.model.MatchTeamInfo;
import com.footballmatchsystem.model.PlayerProfile;
import com.footballmatchsystem.repository.MatchLineupRepository;
import com.footballmatchsystem.repository.MatchTeamInfoRepository;
import com.footballmatchsystem.repository.PlayerProfileRepository;
import com.footballmatchsystem.service.LineupService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class LineupServiceImpl implements LineupService {

    private final MatchLineupRepository lineupRepository;
    private final MatchTeamInfoRepository matchTeamInfoRepository;
    private final PlayerProfileRepository playerRepository;

    @Override
    public List<MatchLineup> saveLineup(Long matchTeamInfoId, List<MatchPlayerLineupDTO> lineupDTOs) {
        MatchTeamInfo matchTeamInfo = matchTeamInfoRepository.findById(matchTeamInfoId)
                .orElseThrow(() -> new BusinessException("比赛队伍信息不存在"));

        lineupRepository.deleteByMatchTeamInfoId(matchTeamInfoId);

        List<MatchLineup> newLineups = new ArrayList<>();
        for (MatchPlayerLineupDTO dto : lineupDTOs) {
            PlayerProfile player = playerRepository.findById(dto.getPlayerId())
                    .orElseThrow(() -> new BusinessException("球员ID不存在: " + dto.getPlayerId()));

            MatchLineup lineup = new MatchLineup();
            lineup.setMatchTeamInfo(matchTeamInfo);
            lineup.setPlayer(player);
            lineup.setPosition(dto.getPosition() != null ?
                    MatchLineup.Position.valueOf(dto.getPosition()) : null);
            lineup.setStarting(dto.isStarting());

            newLineups.add(lineup);
        }

        validateLineup(newLineups);
        return lineupRepository.saveAll(newLineups);
    }

    @Override
    public List<MatchLineup> getLineupByMatchTeam(Long matchTeamInfoId) {
        return lineupRepository.findByMatchTeamInfoIdOrderByIsStartingDescPositionAsc(matchTeamInfoId);
    }

    private void validateLineup(List<MatchLineup> lineups) {
        long startingGKs = lineups.stream()
                .filter(MatchLineup::isStarting)
                .filter(l -> l.getPosition() == MatchLineup.Position.GK)
                .count();

        if (startingGKs != 1) {
            throw new BusinessException("首发阵容必须有且只有1名门将(GK)");
        }

    }

}
