package com.footballmatchsystem.service;

import com.footballmatchsystem.dto.TournamentDTO;
import com.footballmatchsystem.model.Tournament;

import java.util.List;
import java.util.Optional;

public interface TournamentService {

    TournamentDTO createTournament(TournamentDTO dto);

    List<TournamentDTO> getAllTournaments();

    Optional<TournamentDTO> getTournamentById(Long id);

    Optional<TournamentDTO> updateTournament(Long id, TournamentDTO updatedDTO);

    boolean deleteTournament(Long id);

    List<Tournament> getAllTournamentEntities();

    String joinTournamentByUsername(Long tournamentId, String username);

}
