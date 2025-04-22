package com.footballmatchsystem.service.impl;

import com.footballmatchsystem.model.TournamentParticipant;
import com.footballmatchsystem.model.TournamentParticipant.JoinStatus;
import com.footballmatchsystem.repository.TournamentParticipantRepository;
import com.footballmatchsystem.service.TournamentParticipantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TournamentParticipantServiceImpl implements TournamentParticipantService {

    private final TournamentParticipantRepository tournamentParticipantRepository;

    @Override
    public List<TournamentParticipant> getParticipantsByTournamentId(Long tournamentId) {
        return tournamentParticipantRepository.getParticipantsByTournamentId(tournamentId);
    }

    @Override
    public ResponseEntity<?> updateParticipantStatus(Long tournamentId, Long participantId, Map<String, String> request) {
        String newStatusStr = request.get("status");
        if (newStatusStr == null) {
            return ResponseEntity.badRequest().body("Missing 'status' field");
        }

        return tournamentParticipantRepository.findById(participantId)
                .map(participant -> {
                    try {
                        JoinStatus newStatus = JoinStatus.valueOf(newStatusStr.toUpperCase());
                        participant.setStatus(newStatus);
                        tournamentParticipantRepository.save(participant);
                        return ResponseEntity.ok().build();
                    } catch (IllegalArgumentException e) {
                        return ResponseEntity.badRequest().body("Invalid status value");
                    }
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
