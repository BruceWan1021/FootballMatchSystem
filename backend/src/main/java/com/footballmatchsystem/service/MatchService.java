package com.footballmatchsystem.service;

import com.footballmatchsystem.model.Match;
import com.footballmatchsystem.model.MatchStatus;
import com.footballmatchsystem.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchService {

    @Autowired
    private MatchRepository matchRepository;

    //根据比赛状态查询比赛
    public List<Match> getMatchesByStatus(MatchStatus status){
        return matchRepository.findByStatus(status);
    }

    //获取所有比赛
    public List<Match> getMatches(){
        return matchRepository.findAll();
    }

    //获取所有已安排的比赛
    public List<Match> getScheduledMatches() {
        return matchRepository.findByStatus(MatchStatus.SCHEDULED);
    }

    //更新比赛状态为“进行中”
    public Match updateMatchStatusToInProgress(Long matchId){
        Match match = matchRepository.findById(matchId).orElseThrow(() -> new RuntimeException("Match not found"));
        match.setStatus(MatchStatus.IN_PROGRESS);
        return matchRepository.save(match);
    }

    //更新比赛状态为“已完成”
    public Match updateMatchStatusToCompleted(Long matchId){
        Match match = matchRepository.findById(matchId).orElseThrow(() -> new RuntimeException("Match not found"));
        match.setStatus(MatchStatus.COMPLETED);
        return matchRepository.save(match);
    }

    //创建比赛
    public Match createMatch(Match match){
        match.setStatus(MatchStatus.SCHEDULED);
        return matchRepository.save(match);
    }



}
