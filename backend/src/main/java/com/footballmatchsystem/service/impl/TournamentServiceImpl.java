package com.footballmatchsystem.service.impl;

import com.footballmatchsystem.dto.TournamentDTO;
import com.footballmatchsystem.mapper.TournamentMapper;
import com.footballmatchsystem.model.Tournament;
import com.footballmatchsystem.repository.TournamentRepository;
import com.footballmatchsystem.service.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TournamentServiceImpl implements TournamentService {

    @Autowired
    private TournamentRepository tournamentRepository;

    @Override
    public TournamentDTO createTournament(TournamentDTO dto) {
        Tournament tournament = TournamentMapper.toEntity(dto);

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
}
