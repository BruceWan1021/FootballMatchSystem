package com.footballmatchsystem.repository;

import com.footballmatchsystem.model.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TournamentRepository extends JpaRepository<Tournament, Long> {

    List<Tournament> findAll();

}
