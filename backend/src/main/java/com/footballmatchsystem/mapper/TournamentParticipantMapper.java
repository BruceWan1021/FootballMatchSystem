package com.footballmatchsystem.mapper;

import com.footballmatchsystem.dto.TeamDTO;
import com.footballmatchsystem.dto.TeamContactDTO;
import com.footballmatchsystem.dto.TournamentDTO;
import com.footballmatchsystem.dto.TournamentParticipantDTO;
import com.footballmatchsystem.model.Team;
import com.footballmatchsystem.model.TeamContact;
import com.footballmatchsystem.model.Tournament;
import com.footballmatchsystem.model.TournamentParticipant;

import java.util.List;
import java.util.stream.Collectors;

public class TournamentParticipantMapper {

    public static TournamentParticipantDTO toDTO(TournamentParticipant participant) {
        if (participant == null) {
            return null;
        }

        TournamentParticipantDTO dto = new TournamentParticipantDTO();
        dto.setId(participant.getId());
        dto.setStatus(participant.getStatus() != null ? participant.getStatus().name() : "UNKNOWN");

        // 设置 teamDTO
        Team team = participant.getTeam();
        if (team != null) {
            TeamDTO teamDTO = new TeamDTO();
            teamDTO.setId(team.getId());
            teamDTO.setName(team.getName());
            teamDTO.setContacts(mapTeamContacts(team.getContacts()));  // 设置队伍联系人的信息
            dto.setTeamDTO(teamDTO);
        }

        // 设置 tournamentDTO
        Tournament tournament = participant.getTournament();
        if (tournament != null) {
            TournamentDTO tournamentDTO = new TournamentDTO();
            tournamentDTO.setId(tournament.getId());
            tournamentDTO.setName(tournament.getName());
            tournamentDTO.setShortName(tournament.getShortName());
            tournamentDTO.setLocation(tournament.getLocation());
            tournamentDTO.setMatchFormat(tournament.getMatchFormat());
            dto.setTournamentDTO(tournamentDTO);
        }

        return dto;
    }

    // 转换队伍联系人信息到 DTO
    private static List<TeamContactDTO> mapTeamContacts(List<TeamContact> contacts) {
        if (contacts == null) {
            return null;
        }
        return contacts.stream().map(contact -> {
            TeamContactDTO contactDTO = new TeamContactDTO();
            contactDTO.setName(contact.getName());
            contactDTO.setEmail(contact.getEmail());
            contactDTO.setPhone(contact.getPhone());
            contactDTO.setRole(contact.getRole());
            contactDTO.setIsPrimary(contact.getIsPrimary());
            return contactDTO;
        }).collect(Collectors.toList());
    }
}
