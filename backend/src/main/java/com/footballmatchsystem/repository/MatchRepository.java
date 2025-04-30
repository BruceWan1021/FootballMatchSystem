package com.footballmatchsystem.repository;

import com.footballmatchsystem.model.Match;
import com.footballmatchsystem.model.MatchStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MatchRepository extends JpaRepository<Match, Long> {

    List<Match> findAll();
    List<Match> findByStatus(MatchStatus status);
    List<Match> findByTournamentId(Long tournamentId);
    List<Match> findByTournamentIdAndStatus(Long id, MatchStatus completed);
    @Query("SELECT m FROM Match m WHERE m.team1.id = :teamId OR m.team2.id = :teamId")
    List<Match> findAllByTeamId(@Param("teamId") Long teamId);

    /**
     * 获取指定队伍的比赛场次
     * @param teamId 队伍ID
     * @return 比赛场次
     */
    @Query("SELECT COUNT(m) FROM Match m WHERE (m.team1.id = :teamId OR m.team2.id = :teamId) AND m.status = 'COMPLETED'")
    int countMatchesByTeamId(@Param("teamId") Long teamId);

    /**
     * 获取指定队伍的胜场数
     * @param teamId 队伍ID
     * @return 胜场数
     */
    @Query("SELECT COUNT(m) FROM Match m WHERE (m.team1.id = :teamId AND m.score1 > m.score2) OR (m.team2.id = :teamId AND m.score2 > m.score1)")
    int countWinsByTeamId(Long teamId);

    /**
     * 获取指定队伍的平局场数
     * @param teamId 队伍ID
     * @return 平局场数
     */
    @Query("""
    SELECT COUNT(m) FROM Match m 
    WHERE ((m.team1.id = :teamId AND m.score1 = m.score2) 
        OR (m.team2.id = :teamId AND m.score2 = m.score1)) 
      AND m.status = 'COMPLETED'
""")
    int countDrawsByTeamId(@Param("teamId") Long teamId);


    /**
     * 获取指定队伍的负场数
     * @param teamId 队伍ID
     * @return 负场数
     */
    @Query("SELECT COUNT(m) FROM Match m WHERE (m.team1.id = :teamId AND m.score1 < m.score2) OR (m.team2.id = :teamId AND m.score2 < m.score1)")
    int countLossesByTeamId(Long teamId);

    /**
     * 获取指定队伍的进球数
     * @param teamId 队伍ID
     * @return 进球数
     */
    @Query("SELECT SUM(CASE WHEN m.team1.id = :teamId THEN m.score1 ELSE 0 END) + SUM(CASE WHEN m.team2.id = :teamId THEN m.score2 ELSE 0 END) FROM Match m")
    int sumGoalsForByTeamId(Long teamId);

    /**
     * 获取指定队伍的失球数
     * @param teamId 队伍ID
     * @return 失球数
     */
    @Query("SELECT SUM(CASE WHEN m.team1.id = :teamId THEN m.score2 ELSE 0 END) + SUM(CASE WHEN m.team2.id = :teamId THEN m.score1 ELSE 0 END) FROM Match m")
    int sumGoalsAgainstByTeamId(Long teamId);

    @Query("""
    SELECT COUNT(m) FROM Match m 
    WHERE (m.team1.id = :teamId OR m.team2.id = :teamId) 
      AND m.tournament.id = :tournamentId 
      AND m.status = 'COMPLETED'
""")
    int countMatchesByTeamIdAndTournamentId(@Param("teamId") Long teamId, @Param("tournamentId") Long tournamentId);


    @Query("SELECT COUNT(m) FROM Match m WHERE ((m.team1.id = :teamId AND m.score1 > m.score2) OR (m.team2.id = :teamId AND m.score2 > m.score1)) AND m.tournament.id = :tournamentId")
    int countWinsByTeamIdAndTournamentId(@Param("teamId") Long teamId, @Param("tournamentId") Long tournamentId);

    @Query("""
    SELECT COUNT(m) FROM Match m
    WHERE (m.team1.id = :teamId OR m.team2.id = :teamId)
      AND m.score1 = m.score2
      AND m.tournament.id = :tournamentId
      AND m.status = 'COMPLETED'
""")
    int countDrawsByTeamIdAndTournamentId(@Param("teamId") Long teamId, @Param("tournamentId") Long tournamentId);


    @Query("SELECT COUNT(m) FROM Match m WHERE ((m.team1.id = :teamId AND m.score1 < m.score2) OR (m.team2.id = :teamId AND m.score2 < m.score1)) AND m.tournament.id = :tournamentId")
    int countLossesByTeamIdAndTournamentId(@Param("teamId") Long teamId, @Param("tournamentId") Long tournamentId);

    @Query("""
        SELECT 
            SUM(CASE WHEN m.team1.id = :teamId THEN m.score1 ELSE 0 END) + 
            SUM(CASE WHEN m.team2.id = :teamId THEN m.score2 ELSE 0 END)
        FROM Match m 
        WHERE m.tournament.id = :tournamentId
    """)
    int sumGoalsForByTeamIdAndTournamentId(@Param("teamId") Long teamId, @Param("tournamentId") Long tournamentId);

    @Query("""
        SELECT 
            SUM(CASE WHEN m.team1.id = :teamId THEN m.score2 ELSE 0 END) + 
            SUM(CASE WHEN m.team2.id = :teamId THEN m.score1 ELSE 0 END)
        FROM Match m 
        WHERE m.tournament.id = :tournamentId
    """)
    int sumGoalsAgainstByTeamIdAndTournamentId(@Param("teamId") Long teamId, @Param("tournamentId") Long tournamentId);

}
