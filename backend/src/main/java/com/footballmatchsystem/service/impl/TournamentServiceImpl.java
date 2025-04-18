package com.footballmatchsystem.service.impl;

import com.footballmatchsystem.dto.TournamentDTO;
import com.footballmatchsystem.mapper.TournamentMapper;
import com.footballmatchsystem.model.*;
import com.footballmatchsystem.repository.*;
import com.footballmatchsystem.service.TournamentService;
import jakarta.transaction.Transactional;
import org.hibernate.mapping.Join;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TournamentServiceImpl implements TournamentService {

    @Autowired
    private TournamentRepository tournamentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private TournamentParticipantRepository participantRepository;
    @Autowired
    private UserTournamentRoleRepository userTournamentRoleRepository;

    @Transactional
    @Override
    public TournamentDTO createTournament(TournamentDTO dto) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Tournament tournament = TournamentMapper.toEntity(dto);
        tournament.setCreator(user);

        if (tournament.getContacts() != null) {
            tournament.getContacts().forEach(contact -> contact.setTournament(tournament));
        }

        Tournament saved = tournamentRepository.save(tournament);

        UserTournamentRole role = new UserTournamentRole(user, saved, UserTournamentRole.TournamentRole.ORGANIZER);
        userTournamentRoleRepository.save(role);
        return TournamentMapper.toDTO(saved);
    }

    @Override
    public List<TournamentDTO> getAllTournaments() {
        return tournamentRepository.findAll()
                .stream()
                .map(TournamentMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<TournamentDTO> getTournamentById(Long id) {
        return tournamentRepository.findById(id)
                .map(TournamentMapper::toDTO);
    }

    @Override
    public Optional<TournamentDTO> updateTournament(Long id, TournamentDTO updatedDTO) {
        return tournamentRepository.findById(id).map(existing -> {
            existing.setName(updatedDTO.getName());
            existing.setShortName(updatedDTO.getShortName());
            // 其他字段同步
            Tournament updated = tournamentRepository.save(existing);
            return TournamentMapper.toDTO(updated);
        });
    }

    @Override
    public boolean deleteTournament(Long id) {
        if (tournamentRepository.existsById(id)) {
            tournamentRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<Tournament> getAllTournamentEntities() {
        return tournamentRepository.findAll();
    }

    @Override
    @Transactional
    public String joinTournamentByUsername(Long tournamentId, String username) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Team team = teamRepository.findByCaptainId(user.getId())
                .orElseThrow(() -> new RuntimeException("No team associated with this user"));

        TournamentParticipant.JoinStatus status = tournament.getRequiresApproval()
                ? TournamentParticipant.JoinStatus.PENDING
                : TournamentParticipant.JoinStatus.APPROVED;

        TournamentParticipant participant = new TournamentParticipant();
        participant.setTournament(tournament);
        participant.setTeam(team);
        participant.setStatus(status);
        participantRepository.save(participant);

        return status == TournamentParticipant.JoinStatus.APPROVED
                ? "Successfully Join"
                : "The application has been submitted and is awaiting review by the manager";
    }

    @Override
    public List<TournamentDTO> getMyTournaments(String username) {
        // 获取当前用户
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 查询用户在联赛中担任 ADMIN 或 ORGANIZER 的所有记录
        List<UserTournamentRole> roles = userTournamentRoleRepository
                .findByUserAndRoleIn(user, List.of(
                        UserTournamentRole.TournamentRole.ADMIN,
                        UserTournamentRole.TournamentRole.ORGANIZER
                ));

        // 提取联赛并映射为 DTO
        return roles.stream()
                .map(UserTournamentRole::getTournament)
                .distinct() // 去重
                .map(TournamentMapper::toDTO)
                .collect(Collectors.toList());
    }



}
