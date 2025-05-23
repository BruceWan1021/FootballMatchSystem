package com.footballmatchsystem.repository;

import com.footballmatchsystem.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

    boolean existsByName(String name);

    Optional<Team> findByCaptainId(Long captainId);

}
