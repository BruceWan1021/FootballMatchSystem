package com.footballmatchsystem.service.impl;

import com.footballmatchsystem.model.TeamParticipant;
import com.footballmatchsystem.model.UserTeamRole;
import com.footballmatchsystem.repository.PlayerProfileRepository;
import com.footballmatchsystem.repository.TeamParticipantRepository;
import com.footballmatchsystem.repository.UserTeamRoleRepository;
import com.footballmatchsystem.service.TeamParticipantService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class TeamParticipantServiceImpl implements TeamParticipantService {

    private final TeamParticipantRepository participantRepository;
    private final PlayerProfileRepository playerProfileRepository;
    private final UserTeamRoleRepository userTeamRoleRepository;


    @Autowired
    public TeamParticipantServiceImpl(TeamParticipantRepository participantRepository, PlayerProfileRepository playerProfileRepository, UserTeamRoleRepository userTeamRoleRepository) {
        this.participantRepository = participantRepository;
        this.playerProfileRepository = playerProfileRepository;
        this.userTeamRoleRepository = userTeamRoleRepository;
    }

    @Override
    public List<TeamParticipant> getParticipantsByTeamId(Long teamId) {
        return participantRepository.findByTeamId(teamId);
    }

    @Override
    @Transactional
    public ResponseEntity<?> updateParticipantStatus(Long teamId, Long participantId, Map<String, String> request) {
        return participantRepository.findByIdAndTeamId(participantId, teamId)
                .map(participant -> {
                    String newStatus = request.get("status");
                    if (newStatus == null || (!newStatus.equals("APPROVED") && !newStatus.equals("REJECTED"))) {
                        return ResponseEntity.badRequest().body("Invalid status value");
                    }

                    participant.setStatus(TeamParticipant.JoinStatus.valueOf(newStatus));
                    participantRepository.save(participant);

                    // 如果审批通过，同步更新 PlayerProfile 的 teamId
                    if (newStatus.equals("APPROVED")) {
                        Long profileId = participant.getUser().getPlayerProfile().getId();
                        playerProfileRepository.updateTeamId(profileId, teamId);

                        if (!userTeamRoleRepository.existsByUserAndTeam(participant.getUser(), participant.getTeam())) {
                            UserTeamRole role = new UserTeamRole(
                                    participant.getUser(),
                                    participant.getTeam(),
                                    UserTeamRole.TeamRole.PLAYER
                            );
                            userTeamRoleRepository.save(role);
                        }
                    }

                    return ResponseEntity.ok("Status updated");
                })
                .orElse(ResponseEntity.notFound().build());
    }
}