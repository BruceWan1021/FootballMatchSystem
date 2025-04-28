package com.footballmatchsystem.service.impl;

import com.footballmatchsystem.dto.MatchEventDTO;
import com.footballmatchsystem.model.Match;
import com.footballmatchsystem.model.MatchEvent;
import com.footballmatchsystem.model.PlayerProfile;
import com.footballmatchsystem.model.Team;
import com.footballmatchsystem.repository.MatchEventRepository;
import com.footballmatchsystem.repository.MatchRepository;
import com.footballmatchsystem.repository.PlayerProfileRepository;
import com.footballmatchsystem.repository.TeamRepository;
import com.footballmatchsystem.service.MatchEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.footballmatchsystem.model.MatchEvent.EventType.GOAL;

@Service
public class MatchEventServiceImpl implements MatchEventService {

    @Autowired
    private MatchEventRepository matchEventRepository;
    @Autowired
    private MatchRepository matchRepository;
    @Autowired
    private PlayerProfileRepository playerProfileRepository;
    @Autowired
    private TeamRepository teamRepository;
    @Override
    public boolean addEvent(Long matchId, MatchEventDTO matchEventDTO) {
            Match match = matchRepository.findById(matchId)
                    .orElseThrow(() -> new RuntimeException("Match with ID " + matchId + " not found"));

            PlayerProfile player = playerProfileRepository.findByTeamIdAndNumber(matchEventDTO.getTeamId(), matchEventDTO.getPlayerNumber())
                    .orElseThrow(() -> new RuntimeException("Player with number " + matchEventDTO.getPlayerNumber() + " in team " + matchEventDTO.getTeamId() + " not found"));

            PlayerProfile assistPlayer = null;
            if (matchEventDTO.getAssistPlayerNumber() != null) {
                assistPlayer = playerProfileRepository.findByTeamIdAndNumber(matchEventDTO.getTeamId(), matchEventDTO.getAssistPlayerNumber())
                        .orElseThrow(() -> new RuntimeException("Assist Player with number " + matchEventDTO.getAssistPlayerNumber() + " in team " + matchEventDTO.getTeamId() + " not found"));
            }

            PlayerProfile substitutePlayer = null;
            if (matchEventDTO.getSubstitutePlayerNumber() != null) {
                substitutePlayer = playerProfileRepository.findByTeamIdAndNumber(matchEventDTO.getTeamId(), matchEventDTO.getSubstitutePlayerNumber())
                        .orElseThrow(() -> new RuntimeException("Substitute Player with number " + matchEventDTO.getSubstitutePlayerNumber() + " in team " + matchEventDTO.getTeamId() + " not found"));
            }

            Team team = teamRepository.findById(matchEventDTO.getTeamId())
                    .orElseThrow(() -> new RuntimeException("Team with ID " + matchEventDTO.getTeamId() + " not found"));

            // 创建 MatchEvent 实体
            MatchEvent matchEvent = new MatchEvent();
            matchEvent.setMatch(match);
            matchEvent.setEventType(MatchEvent.EventType.valueOf(matchEventDTO.getEventType()));
            matchEvent.setEventTime(matchEventDTO.getEventTime());
            matchEvent.setEventDescription(matchEventDTO.getEventDescription());
            matchEvent.setPlayer(player);
            matchEvent.setTeam(team);
            matchEvent.setAssistPlayer(assistPlayer);
            matchEvent.setSubstitutePlayer(substitutePlayer);

            if (matchEvent.getEventType() == GOAL){
                if (team.getId() == match.getTeam1().getId()){
                    match.setScore1(match.getScore1()+1);
                    matchRepository.save(match);
                } else {
                    match.setScore2(match.getScore2()+1);
                    matchRepository.save(match);
                }
            }
            matchEventRepository.save(matchEvent);
            return true;
    }

    @Override
    public List<MatchEventDTO> getMatchEvent(Long matchId) {
        List<MatchEvent> matchEvents = matchEventRepository.findByMatchId(matchId);  // 从数据库中查询事件

        return matchEvents.stream()
                .map(this::convertToDTO)  // 将实体对象转换为DTO
                .collect(Collectors.toList());
    }

    private MatchEventDTO convertToDTO(MatchEvent matchEvent) {

        MatchEventDTO dto = new MatchEventDTO();
        dto.setEventType(String.valueOf(matchEvent.getEventType()));
        dto.setEventTime(matchEvent.getEventTime());
        dto.setEventDescription(matchEvent.getEventDescription());
        dto.setPlayerNumber(matchEvent.getPlayer().getNumber());
        dto.setTeamId(matchEvent.getTeam().getId());
        if (matchEvent.getAssistPlayer() != null) {
            dto.setAssistPlayerNumber(matchEvent.getAssistPlayer().getNumber());
        } else {
            dto.setAssistPlayerNumber(null);
        }

        if (matchEvent.getSubstitutePlayer() != null) {
            dto.setSubstitutePlayerNumber(matchEvent.getSubstitutePlayer().getNumber());
        } else {
            dto.setSubstitutePlayerNumber(null);
        }
        return dto;
    }

}
