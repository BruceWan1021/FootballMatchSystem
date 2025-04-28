package com.footballmatchsystem.controller;

import com.footballmatchsystem.dto.LineupRequest;
import com.footballmatchsystem.dto.MatchDTO;
import com.footballmatchsystem.dto.MatchEventDTO;
import com.footballmatchsystem.mapper.MatchMapper;
import com.footballmatchsystem.model.Match;
import com.footballmatchsystem.model.MatchTeamInfo;
import com.footballmatchsystem.service.MatchEventService;
import com.footballmatchsystem.service.MatchService;
import com.footballmatchsystem.service.MatchTeamInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/matches")
public class MatchController {

    @Autowired
    private MatchService matchService;
    @Autowired
    private MatchTeamInfoService matchTeamInfoService;
    @Autowired
    private MatchEventService matchEventService;

    @GetMapping("/all")
    public ResponseEntity<List<MatchDTO>> getMatches() {
        List<MatchDTO> matches = matchService.getMatches()
                .stream()
                .map(MatchMapper::toDTO)
                .toList();
        return ResponseEntity.ok(matches);
    }

    @GetMapping("{id}")
    public ResponseEntity<MatchDTO> getMatchDetails(@PathVariable Long id) {
        return matchService.getMatchById(id)
                .map(MatchMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @GetMapping("/scheduled")
    public ResponseEntity<List<MatchDTO>> getScheduleMatches() {
        List<MatchDTO> scheduledMatches = matchService.getScheduledMatches()
                .stream()
                .map(MatchMapper::toDTO) // 使用统一的 DTO 转换器
                .toList();
        return ResponseEntity.ok(scheduledMatches);
    }

    @PutMapping("/{matchId}")
    public ResponseEntity<?> updateMatch(@PathVariable Long matchId, @RequestBody MatchDTO matchDTO) {
        try {
            // Call service to update the match
            Match updatedMatch = matchService.updateMatch(matchId, matchDTO);

            if (updatedMatch == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(updatedMatch);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to update match: " + e.getMessage());
        }
    }

    @PutMapping("/{matchId}/in-progress")
    public ResponseEntity<MatchDTO> updateMatchStatusToInProgress(@PathVariable Long matchId){
        Match updatedMatch = matchService.updateMatchStatusToInProgress(matchId);
        return ResponseEntity.ok(MatchMapper.toDTO(updatedMatch));
    }

    @PutMapping("/{matchId}/completed")
    public ResponseEntity<MatchDTO> updateMatchStatusToCompleted(@PathVariable Long matchId){
        Match updatedMatch = matchService.updateMatchStatusToCompleted(matchId);
        return ResponseEntity.ok(MatchMapper.toDTO(updatedMatch));
    }

    @PostMapping
    public ResponseEntity<MatchDTO> createMatch(@RequestBody Match match){
        Match createdMatch = matchService.createMatch(match);
        return ResponseEntity.status(HttpStatus.CREATED).body(MatchMapper.toDTO(createdMatch));
    }

    @GetMapping("/tournaments/{id}")
    public ResponseEntity<List<MatchDTO>> getMatches(@PathVariable Long id) {
        List<MatchDTO> matchList = matchService.getMatchesByTournamentId(id);
        return ResponseEntity.ok(matchList);
    }

    @GetMapping("/teams/{id}")
    public ResponseEntity<List<MatchDTO>> getMatchesByTeam(@PathVariable Long id) {
        List<MatchDTO> matchList = matchService.getMatchesByTeamId(id);
        return ResponseEntity.ok(matchList);
    }

    @GetMapping("/matchTeamInfo/{matchId}/{teamId}")
    public ResponseEntity<MatchTeamInfo> getMatchTeamInfo(
            @PathVariable Long matchId,
            @PathVariable Long teamId) {
        try {

            MatchTeamInfo matchTeamInfo = matchService.getMatchTeamInfo(matchId, teamId);

            if (matchTeamInfo == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(matchTeamInfo, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/matchTeamInfo/{matchId}/{teamId}")
    public ResponseEntity<String> saveLineup(
            @PathVariable Long matchId,
            @PathVariable Long teamId,
            @RequestBody List<LineupRequest> lineupRequest,
            Authentication authentication) {

        try {
            // 调用服务层方法保存阵容数据
            matchTeamInfoService.saveLineup(matchId, teamId, lineupRequest);

            // 返回成功响应
            return ResponseEntity.ok("阵容保存成功！");
        } catch (Exception e) {
            // 捕获异常并返回错误消息
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("保存阵容出错: " + e.getMessage());
        }
    }

    @GetMapping("/lastLineup/{teamId}")
    public ResponseEntity<?> getLastLineup(@PathVariable Long teamId) {
        try {
            // 调用服务层方法获取上一条阵容数据
            MatchTeamInfo lastLineup = matchTeamInfoService.getLastLineup(teamId);

            if (lastLineup == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("没有找到该球队的上一条阵容数据");
            }

            // 返回上一条阵容数据
            return ResponseEntity.ok(lastLineup);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("获取上一条阵容数据失败: " + e.getMessage());
        }
    }

    @PostMapping("/{matchId}/events")
    public ResponseEntity<Map<String, Object>> addEvent(
            @PathVariable("matchId") Long matchId,
            @RequestBody MatchEventDTO matchEventDTO) {

        Map<String, Object> response = new HashMap<>();
        try {
            boolean isEventAdded = matchEventService.addEvent(matchId, matchEventDTO);

            if (isEventAdded) {
                response.put("message", "Event added successfully");
                response.put("success", true);
                return ResponseEntity.ok(response); // 返回成功的 JSON 响应
            } else {
                response.put("message", "Failed to add event");
                response.put("success", false);
                return ResponseEntity.status(400).body(response); // 返回失败的 JSON 响应
            }
        } catch (Exception e) {
            response.put("message", "An error occurred: " + e.getMessage());
            response.put("success", false);
            return ResponseEntity.status(500).body(response); // 捕获异常并返回错误的 JSON 响应
        }
    }

    @GetMapping("/{matchId}/events")
    public ResponseEntity<List<MatchEventDTO>> getMatchEvents(@PathVariable Long matchId) {

            List<MatchEventDTO> events = matchEventService.getMatchEvent(matchId);  // 调用服务层获取事件数据
            if (events != null && !events.isEmpty()) {
                return ResponseEntity.ok(events);  // 返回事件列表
            } else {
                return ResponseEntity.noContent().build();  // 没有事件时返回 204 No Content
            }
    }

}
