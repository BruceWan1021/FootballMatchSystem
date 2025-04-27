package com.footballmatchsystem.repository;

import com.footballmatchsystem.model.MatchEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MatchEventRepository extends JpaRepository<MatchEvent, Long> {
    // 你可以根据需要定义其他查询方法
}

