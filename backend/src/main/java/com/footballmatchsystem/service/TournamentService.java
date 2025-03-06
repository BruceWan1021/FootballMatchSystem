package com.footballmatchsystem.service;

import com.footballmatchsystem.model.Tournament;
import com.footballmatchsystem.repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TournamentService {

    @Autowired
    private TournamentRepository tournamentRepository;

    //获取所有联赛
    public List<Tournament> getAllTournament(){return tournamentRepository.findAll();}
}
