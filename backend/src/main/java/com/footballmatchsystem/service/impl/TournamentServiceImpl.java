package com.footballmatchsystem.service.impl;

import com.footballmatchsystem.dto.TournamentDTO;
import com.footballmatchsystem.mapper.TournamentMapper;
import com.footballmatchsystem.model.Team;
import com.footballmatchsystem.model.Tournament;
import com.footballmatchsystem.model.TournamentParticipant;
import com.footballmatchsystem.model.User;
import com.footballmatchsystem.repository.TeamRepository;
import com.footballmatchsystem.repository.TournamentParticipantRepository;
import com.footballmatchsystem.repository.TournamentRepository;
import com.footballmatchsystem.repository.UserRepository;
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
    private TeamRepository teamRepository;
    @Autowired
    private TournamentParticipantRepository participantRepository;

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
    public void joinTournamentByUsername(Long tournamentId, String username) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Team team = teamRepository.findByCaptainId(user.getId())
                .orElseThrow(() -> new RuntimeException("No team associated with this user"));

        // 检查是否已加入
        if (participantRepository.existsByTournamentAndTeam(tournament, team)) {
            throw new RuntimeException("This team has already joined the tournament.");
        }

        TournamentParticipant participant = new TournamentParticipant();
        participant.setTournament(tournament);
        participant.setTeam(team);
        participantRepository.save(participant);
    }

}
