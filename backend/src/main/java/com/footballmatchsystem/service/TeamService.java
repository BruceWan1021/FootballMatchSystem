package com.footballmatchsystem.service;

import com.footballmatchsystem.dto.TeamDTO;
import com.footballmatchsystem.mapper.TeamMapper;
import com.footballmatchsystem.model.Team;
import com.footballmatchsystem.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    private final String UPLOAD_DIR = "uploads/logos/";

    public TeamDTO createTeam(TeamDTO teamDTO) {
        Team team = TeamMapper.toEntity(teamDTO);
        team.setCreatedAt(LocalDateTime.now());
        Team saved = teamRepository.save(team);
        return TeamMapper.toDTO(saved);
    }

    public List<TeamDTO> getAllTeams() {
        return teamRepository.findAll()
                .stream()
                .map(TeamMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<TeamDTO> getTeamById(Long id) {
        return teamRepository.findById(id)
                .map(TeamMapper::toDTO);
    }

    public Optional<TeamDTO> updateTeam(Long id, TeamDTO updatedDTO) {
        return teamRepository.findById(id).map(existing -> {
            Team updated = TeamMapper.toEntity(updatedDTO);
            updated.setId(id);
            Team saved = teamRepository.save(updated);
            return TeamMapper.toDTO(saved);
        });
    }

    public boolean deleteTeam(Long id) {
        if (teamRepository.existsById(id)) {
            teamRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean existsByName(String name) {
        return teamRepository.existsByName(name);
    }

    /**
     * Uploads the team logo file and returns a relative or public URL path.
     */
    public String uploadLogo(MultipartFile file) {
        try {
            // Create folder if not exists
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate unique filename
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(filename);

            // Save the file
            Files.write(filePath, file.getBytes());

            // Return public URL path or relative path
            return "/uploads/logos/" + filename;
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload logo", e);
        }
    }
}
