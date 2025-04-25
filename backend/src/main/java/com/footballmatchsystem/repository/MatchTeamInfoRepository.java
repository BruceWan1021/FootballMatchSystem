package com.footballmatchsystem.repository;

import com.footballmatchsystem.model.MatchTeamInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MatchTeamInfoRepository extends JpaRepository<MatchTeamInfo, Long> {

}
