package com.footballmatchsystem.service;

import com.footballmatchsystem.dto.TeamParticipantDTO;
import com.footballmatchsystem.model.TeamParticipant;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface TeamParticipantService {

    List<TeamParticipant> getParticipantsByTeamId(Long teamId);

    ResponseEntity<?> updateParticipantStatus(Long teamId, Long participantId, Map<String, String> request);
}
