package com.footballmatchsystem.service.impl;

import com.footballmatchsystem.dto.TeamStatsDTO;
import com.footballmatchsystem.dto.TournamentDTO;
import com.footballmatchsystem.mapper.TournamentMapper;
import com.footballmatchsystem.model.*;
import com.footballmatchsystem.repository.*;
import com.footballmatchsystem.service.TournamentService;
import jakarta.transaction.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    private UserTeamRoleRepository userTeamRoleRepository;
    @Autowired
    private TournamentParticipantRepository participantRepository;
    @Autowired
    private UserTournamentRoleRepository userTournamentRoleRepository;
    @Autowired
    private TournamentParticipantRepository tournamentParticipantRepository;
    @Autowired
    private MatchRepository matchRepository;

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
    @Transactional
    public Optional<TournamentDTO> updateTournament(Long id, TournamentDTO updatedDTO) {
        return tournamentRepository.findById(id).map(existing -> {
            Tournament updatedEntity = TournamentMapper.toEntity(updatedDTO);

            // 保留已有数据
            updatedEntity.setId(existing.getId());
            updatedEntity.setCreator(existing.getCreator());
            updatedEntity.setCreatedAt(existing.getCreatedAt());

            // 设置关联关系
            if (updatedEntity.getContacts() != null) {
                updatedEntity.getContacts().forEach(contact -> contact.setTournament(updatedEntity));
            }

            Tournament saved = tournamentRepository.save(updatedEntity);
            return TournamentMapper.toDTO(saved);
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

        List<UserTeamRole> userTeamRoles = userTeamRoleRepository.findByUserId(user.getId());

        Team team = userTeamRoles.stream()
                .findFirst()
                .map(UserTeamRole::getTeam)
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

    public boolean isAdminOrCreator(Long tournamentId, String userName) {
        Optional<User> userOpt = userRepository.findByUsername(userName);
        if (userOpt.isEmpty()) return false;

        Long userId = userOpt.get().getId();

        return userTournamentRoleRepository.existsByUserIdAndTournamentIdAndRole(userId, tournamentId, UserTournamentRole.TournamentRole.ADMIN) ||
                userTournamentRoleRepository.existsByUserIdAndTournamentIdAndRole(userId, tournamentId, UserTournamentRole.TournamentRole.ORGANIZER);
    }

    @Override
    public List<TeamStatsDTO> getStandingsByTournamentId(Long tournamentId) {

        List<TournamentParticipant> participants = tournamentParticipantRepository.findByTournamentId(tournamentId);

        return participants.stream().map(participant -> {
            int matchesPlayed = matchRepository.countMatchesByTeamIdAndTournamentId(participant.getTeam().getId(), tournamentId);  // 获取比赛场次
            int wins = matchRepository.countWinsByTeamIdAndTournamentId(participant.getTeam().getId(), tournamentId);  // 获取胜场数
            int draws = matchRepository.countDrawsByTeamIdAndTournamentId(participant.getTeam().getId(), tournamentId);  // 获取平局场数
            int losses = matchRepository.countLossesByTeamIdAndTournamentId(participant.getTeam().getId(), tournamentId);  // 获取负场数
            int goalsFor = matchRepository.sumGoalsForByTeamIdAndTournamentId(participant.getTeam().getId(), tournamentId);  // 获取进球数
            int goalsAgainst = matchRepository.sumGoalsAgainstByTeamIdAndTournamentId(participant.getTeam().getId(), tournamentId);  // 获取失球数

            TeamStatsDTO stats = new TeamStatsDTO();
            stats.setTeamId(participant.getTeam().getId());
            stats.setTeamName(participant.getTeam().getName());
            stats.setMatchesPlayed(matchesPlayed);
            stats.setWins(wins);
            stats.setDraws(draws);
            stats.setLosses(losses);
            stats.setGoalsFor(goalsFor);
            stats.setGoalsAgainst(goalsAgainst);
            stats.setPoints(wins*3+draws);

            return stats;
        }).collect(Collectors.toList());
    }

}
