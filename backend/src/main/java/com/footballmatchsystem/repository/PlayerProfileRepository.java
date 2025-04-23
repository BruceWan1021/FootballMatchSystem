package com.footballmatchsystem.repository;

import com.footballmatchsystem.model.PlayerProfile;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PlayerProfileRepository extends CrudRepository<PlayerProfile, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE PlayerProfile p SET p.team.id = :teamId WHERE p.id = :profileId")
    void updateTeamId(Long profileId, Long teamId);

    List<PlayerProfile> findByTeamId(Long teamId);

}
