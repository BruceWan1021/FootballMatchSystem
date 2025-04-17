package com.footballmatchsystem.repository;

import com.footballmatchsystem.model.UserTeamRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserTeamRoleRepository extends JpaRepository<UserTeamRole, Long> {

    // 查询某个用户在某支队伍的角色记录
    Optional<UserTeamRole> findByUserIdAndTeamId(Long userId, Long teamId);

    // 查询某支队伍的所有用户角色（比如用于显示成员列表）
    List<UserTeamRole> findByTeamId(Long teamId);

    // 查询某个用户参与的所有球队（例如我的球队页）
    List<UserTeamRole> findByUserId(Long userId);

    // 判断用户是否为特定角色（如是否是队长）
    boolean existsByUserIdAndTeamIdAndRole(Long userId, Long teamId, String role);

    // 获取队伍中所有某种角色（如所有 captain、所有 player）
    List<UserTeamRole> findByTeamIdAndRole(Long teamId, String role);
}
