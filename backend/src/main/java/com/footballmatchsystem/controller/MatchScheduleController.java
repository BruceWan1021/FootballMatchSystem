package com.footballmatchsystem.controller;

import com.footballmatchsystem.dto.MatchDTO;
import com.footballmatchsystem.mapper.MatchMapper;
import com.footballmatchsystem.model.Match;
import com.footballmatchsystem.service.KnockoutService;
import com.footballmatchsystem.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedule")
public class MatchScheduleController {

    @Autowired
    private KnockoutService knockoutService;

    @Autowired
    private MatchService matchService;

    /**
     * 生成单败淘汰赛第一轮赛程
     */
    @PostMapping("/tournaments/{id}/generate-knockout")
    public ResponseEntity<List<MatchDTO>> generateKnockout(@PathVariable Long id) {
        List<Match> matches = knockoutService.generateFirstRound(id);
        List<MatchDTO> dto= matches.stream().map(MatchMapper::toDTO).toList();
        return ResponseEntity.ok(dto);
    }

    /**
     * 完成某一场淘汰赛，如果一轮全部结束自动推进下一轮
     */
    @PutMapping("/knockout/{matchId}/complete")
    public ResponseEntity<MatchDTO> completeKnockoutMatch(@PathVariable Long matchId) {
        Match match = knockoutService.completeMatchAndAdvance(matchId);
        return ResponseEntity.ok(MatchMapper.toDTO(match));
    }

    /**
     * 生成循环赛完整赛程（例如：单循环或双循环）
     */

}
