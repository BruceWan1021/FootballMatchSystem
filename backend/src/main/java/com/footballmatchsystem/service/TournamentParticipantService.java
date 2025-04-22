package com.footballmatchsystem.service;

import com.footballmatchsystem.model.TournamentParticipant;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface TournamentParticipantService {

    List<TournamentParticipant> getParticipantsByTournamentId(Long tournamentId);

    ResponseEntity<?> updateParticipantStatus(Long tournamentId, Long participantId, Map<String, String> request);
}
