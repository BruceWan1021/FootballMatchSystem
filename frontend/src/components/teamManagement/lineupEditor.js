import React, { useEffect, useState } from "react";
import { 
  Box, 
  Typography, 
  Divider, 
  CircularProgress, 
  Alert,
  Button,
  Paper
} from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FieldRow from "../lineupEditor/FieldRow";
import SubstituteBench from "../lineupEditor/SubstituteBench";

const LineupEditor = ({ teamId, matchId, onSaveSuccess }) => {
  // 状态管理
  const [lineup, setLineup] = useState({
    formation: "4-4-2",
    players: {
      forwards: [],
      attackingMidfielders: [],
      centralMidfielders: [],
      defensiveMidfielders: [],
      wingMidfielders: [],
      defenders: [],
      goalkeeper: []
    },
    substitutes: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [matchTeamInfoId, setMatchTeamInfoId] = useState(null);

  // 添加阵型选项
  const formations = [
    { 
      value: "4-4-2", 
      label: "4-4-2", 
      structure: { 
        forwards: 2, 
        centralMidfielders: 4, 
        defenders: 4, 
        goalkeeper: 1 
      } 
    },
    { 
      value: "4-3-3", 
      label: "4-3-3", 
      structure: { 
        forwards: 3, 
        centralMidfielders: 3, 
        defenders: 4, 
        goalkeeper: 1 
      } 
    },
    { 
      value: "3-5-2", 
      label: "3-5-2", 
      structure: { 
        forwards: 2, 
        centralMidfielders: 3,
        wingMidfielders: 2,
        defenders: 3, 
        goalkeeper: 1 
      } 
    },
    { 
      value: "5-3-2", 
      label: "5-3-2", 
      structure: { 
        forwards: 2, 
        centralMidfielders: 3, 
        defenders: 5, 
        goalkeeper: 1 
      } 
    },
    { 
      value: "4-2-3-1", 
      label: "4-2-3-1", 
      structure: { 
        forwards: 1, 
        attackingMidfielders: 3,
        defensiveMidfielders: 2,
        defenders: 4, 
        goalkeeper: 1 
      } 
    },
    { 
      value: "4-1-2-1-2", 
      label: "4-1-2-1-2", 
      structure: { 
        forwards: 2, 
        attackingMidfielders: 1,
        centralMidfielders: 2,
        defensiveMidfielders: 1,
        defenders: 4, 
        goalkeeper: 1 
      } 
    },
    { 
      value: "3-4-3", 
      label: "3-4-3", 
      structure: { 
        forwards: 3, 
        wingMidfielders: 2,
        centralMidfielders: 2,
        defenders: 3, 
        goalkeeper: 1 
      } 
    },
    { 
      value: "4-5-1", 
      label: "4-5-1", 
      structure: { 
        forwards: 1, 
        wingMidfielders: 2,
        centralMidfielders: 3,
        defenders: 4, 
        goalkeeper: 1 
      } 
    },
    { 
      value: "5-4-1", 
      label: "5-4-1", 
      structure: { 
        forwards: 1, 
        wingMidfielders: 2,
        centralMidfielders: 2,
        defenders: 5, 
        goalkeeper: 1 
      } 
    },
    { 
      value: "3-3-4", 
      label: "3-3-4", 
      structure: { 
        forwards: 4, 
        centralMidfielders: 3, 
        defenders: 3, 
        goalkeeper: 1 
      } 
    },
    { 
      value: "4-2-2-2", 
      label: "4-2-2-2", 
      structure: { 
        forwards: 2, 
        attackingMidfielders: 2,
        defensiveMidfielders: 2,
        defenders: 4, 
        goalkeeper: 1 
      } 
    },
    { 
      value: "3-6-1", 
      label: "3-6-1", 
      structure: { 
        forwards: 1, 
        wingMidfielders: 2,
        centralMidfielders: 4,
        defenders: 3, 
        goalkeeper: 1 
      } 
    }
  ];

  useEffect(() => {
    console.log('LineupEditor props:', { teamId, matchTeamInfoId });
  }, [teamId, matchTeamInfoId]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem("authToken");
        const response = await fetch(
          `http://localhost:8080/api/profile/player/${teamId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (!response.ok) throw new Error("获取球员数据失败");

        const players = await response.json();
        console.log(players)
        initializeLineup(players);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const initializeLineup = (players) => {
      const validatedPlayers = players.map(p => ({
        userId: p.id || p.userId,
        username: p.username || p.name,
        number: p.number || 0,
        position: p.position || null
      }));

      // 根据球员位置分类
      const forwards = validatedPlayers.filter(p => p.position === "FW");
      const midfielders = validatedPlayers.filter(p => p.position === "MF");
      const defenders = validatedPlayers.filter(p => p.position === "DF");
      const goalkeepers = validatedPlayers.filter(p => p.position === "GK");

      // 确保每个位置至少有一个球员
      const defaultLineup = {
        formation: "4-4-2",
        players: {
          forwards: forwards.slice(0, 2),
          attackingMidfielders: [],
          centralMidfielders: midfielders.slice(0, 4),
          defensiveMidfielders: [],
          wingMidfielders: [],
          defenders: defenders.slice(0, 4),
          goalkeeper: goalkeepers.slice(0, 1)
        },
        substitutes: []
      };

      // 将剩余球员放入替补席
      const startingPlayers = [
        ...defaultLineup.players.forwards,
        ...defaultLineup.players.centralMidfielders,
        ...defaultLineup.players.defenders,
        ...defaultLineup.players.goalkeeper
      ];

      defaultLineup.substitutes = validatedPlayers.filter(
        player => !startingPlayers.some(p => p.userId === player.userId)
      );

      setLineup(defaultLineup);
    };

    if (teamId) fetchPlayers();
  }, [teamId]);

  useEffect(() => {
    const fetchMatchTeamInfo = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        const response = await fetch(
          `http://localhost:8080/api/matches/matchTeamInfo/${matchId}/${teamId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (!response.ok) throw new Error("获取比赛信息失败");
        const data = await response.json();
        console.log(data)
        setMatchTeamInfoId(data.id);
      } catch (err) {
        console.error("获取比赛信息出错:", err);
      }
    };

    if (matchId && teamId) {
      fetchMatchTeamInfo();
    }
  }, [matchId, teamId]);

  // 球员交换逻辑
  const swapPlayers = (sourceId, targetId) => {
    setLineup(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      
      const findPlayer = (userId) => {
        // 在首发中查找
        for (const [position, players] of Object.entries(newState.players)) {
          const index = players.findIndex(p => p?.userId === userId);
          if (index !== -1) return { type: "starting", position, index };
        }
        // 在替补中查找
        const subIndex = newState.substitutes.findIndex(p => p?.userId === userId);
        if (subIndex !== -1) return { type: "substitute", index: subIndex };
        return null;
      };

      const source = findPlayer(sourceId);
      const target = findPlayer(targetId);

      if (source && target) {
        const getPlayer = (loc) => 
          loc.type === "starting" 
            ? newState.players[loc.position][loc.index]
            : newState.substitutes[loc.index];

        const setPlayer = (loc, player) => {
          if (loc.type === "starting") {
            newState.players[loc.position][loc.index] = player;
          } else {
            newState.substitutes[loc.index] = player;
          }
        };

        const sourcePlayer = getPlayer(source);
        const targetPlayer = getPlayer(target);
        setPlayer(source, targetPlayer);
        setPlayer(target, sourcePlayer);
      }

      return newState;
    });
  };

  // 处理阵型变化
  const handleFormationChange = (newFormation) => {
    const formation = formations.find(f => f.value === newFormation);
    if (!formation) return;

    setLineup(prev => {
      const newState = { ...prev, formation: newFormation };
      const allPlayers = [
        ...prev.players.forwards,
        ...prev.players.attackingMidfielders,
        ...prev.players.centralMidfielders,
        ...prev.players.defensiveMidfielders,
        ...prev.players.wingMidfielders,
        ...prev.players.defenders,
        ...prev.players.goalkeeper,
        ...prev.substitutes
      ].filter(Boolean);

      // 重新分配球员
      newState.players = {
        forwards: allPlayers.slice(0, formation.structure.forwards || 0),
        attackingMidfielders: allPlayers.slice(
          formation.structure.forwards || 0,
          (formation.structure.forwards || 0) + (formation.structure.attackingMidfielders || 0)
        ),
        centralMidfielders: allPlayers.slice(
          (formation.structure.forwards || 0) + (formation.structure.attackingMidfielders || 0),
          (formation.structure.forwards || 0) + (formation.structure.attackingMidfielders || 0) + (formation.structure.centralMidfielders || 0)
        ),
        defensiveMidfielders: allPlayers.slice(
          (formation.structure.forwards || 0) + (formation.structure.attackingMidfielders || 0) + (formation.structure.centralMidfielders || 0),
          (formation.structure.forwards || 0) + (formation.structure.attackingMidfielders || 0) + (formation.structure.centralMidfielders || 0) + (formation.structure.defensiveMidfielders || 0)
        ),
        wingMidfielders: allPlayers.slice(
          (formation.structure.forwards || 0) + (formation.structure.attackingMidfielders || 0) + (formation.structure.centralMidfielders || 0) + (formation.structure.defensiveMidfielders || 0),
          (formation.structure.forwards || 0) + (formation.structure.attackingMidfielders || 0) + (formation.structure.centralMidfielders || 0) + (formation.structure.defensiveMidfielders || 0) + (formation.structure.wingMidfielders || 0)
        ),
        defenders: allPlayers.slice(
          (formation.structure.forwards || 0) + (formation.structure.attackingMidfielders || 0) + (formation.structure.centralMidfielders || 0) + (formation.structure.defensiveMidfielders || 0) + (formation.structure.wingMidfielders || 0),
          (formation.structure.forwards || 0) + (formation.structure.attackingMidfielders || 0) + (formation.structure.centralMidfielders || 0) + (formation.structure.defensiveMidfielders || 0) + (formation.structure.wingMidfielders || 0) + (formation.structure.defenders || 0)
        ),
        goalkeeper: allPlayers.slice(
          (formation.structure.forwards || 0) + (formation.structure.attackingMidfielders || 0) + (formation.structure.centralMidfielders || 0) + (formation.structure.defensiveMidfielders || 0) + (formation.structure.wingMidfielders || 0) + (formation.structure.defenders || 0),
          (formation.structure.forwards || 0) + (formation.structure.attackingMidfielders || 0) + (formation.structure.centralMidfielders || 0) + (formation.structure.defensiveMidfielders || 0) + (formation.structure.wingMidfielders || 0) + (formation.structure.defenders || 0) + (formation.structure.goalkeeper || 0)
        )
      };
      newState.substitutes = allPlayers.slice(
        (formation.structure.forwards || 0) + (formation.structure.attackingMidfielders || 0) + (formation.structure.centralMidfielders || 0) + (formation.structure.defensiveMidfielders || 0) + (formation.structure.wingMidfielders || 0) + (formation.structure.defenders || 0) + (formation.structure.goalkeeper || 0)
      );

      return newState;
    });
  };

  // 保存阵容到后端
  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      // 验证阵容
      const startingPlayers = [
        ...lineup.players.forwards,
        ...lineup.players.attackingMidfielders,
        ...lineup.players.centralMidfielders,
        ...lineup.players.defensiveMidfielders,
        ...lineup.players.wingMidfielders,
        ...lineup.players.defenders,
        ...lineup.players.goalkeeper
      ].filter(Boolean);

      if (startingPlayers.length !== 11) {
        throw new Error("必须选择11名首发球员");
      }

      if (!lineup.players.goalkeeper.some(Boolean)) {
        throw new Error("必须选择1名门将");
      }

      // 准备数据
      const requestData = [
        ...lineup.players.forwards.filter(Boolean).map(p => ({
          playerId: p.userId,
          position: "FW",
          isStarting: true
        })),
        ...lineup.players.attackingMidfielders.filter(Boolean).map(p => ({
          playerId: p.userId,
          position: "AM",
          isStarting: true
        })),
        ...lineup.players.centralMidfielders.filter(Boolean).map(p => ({
          playerId: p.userId,
          position: "CM",
          isStarting: true
        })),
        ...lineup.players.defensiveMidfielders.filter(Boolean).map(p => ({
          playerId: p.userId,
          position: "DM",
          isStarting: true
        })),
        ...lineup.players.wingMidfielders.filter(Boolean).map(p => ({
          playerId: p.userId,
          position: "WM",
          isStarting: true
        })),
        ...lineup.players.defenders.filter(Boolean).map(p => ({
          playerId: p.userId,
          position: "DF",
          isStarting: true
        })),
        ...lineup.players.goalkeeper.filter(Boolean).map(p => ({
          playerId: p.userId,
          position: "GK",
          isStarting: true
        })),
        ...lineup.substitutes.filter(Boolean).map(p => ({
          playerId: p.userId,
          position: "NULL",
          isStarting: false
        }))
      ];

      // 发送请求
      const token = sessionStorage.getItem("authToken");
      const response = await fetch(`http://localhost:8080/api/matches/matchTeamInfo/${matchId}/${teamId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(requestData),
      });
console.log(requestData)
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorMessage = "保存失败";
        
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          errorMessage = await response.text() || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      setSaveSuccess(true);
      if (onSaveSuccess) onSaveSuccess();
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("保存阵容出错:", error);
      setSaveError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Box>
        {/* 阵容展示部分 */}
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Box display="flex" gap={2} flexWrap="wrap">
              {formations.map((formation) => (
                <Button
                  key={formation.value}
                  variant={lineup.formation === formation.value ? "contained" : "outlined"}
                  onClick={() => handleFormationChange(formation.value)}
                  size="small"
                >
                  {formation.label}
                </Button>
              ))}
            </Box>
          </Box>
          
          <Box display="flex" gap={4}>
            {/* 主力阵容 */}
            <Box flex={1}>
              {["forwards", "attackingMidfielders", "centralMidfielders", "defensiveMidfielders", "wingMidfielders", "defenders", "goalkeeper"].map((line) => (
                lineup.players[line]?.length > 0 && (
                  <FieldRow
                    key={line}
                    position={line}
                    players={lineup.players[line]}
                    swapPlayers={swapPlayers}
                  />
                )
              ))}
            </Box>
            
            {/* 替补席 */}
            <Box width={300}>
              <SubstituteBench 
                players={lineup.substitutes} 
                swapPlayers={swapPlayers} 
              />
            </Box>
          </Box>
        </Paper>

        {/* 保存控制部分 */}
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box flex={1}>
              {saveError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {saveError}
                </Alert>
              )}
              {saveSuccess && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  Upload the lineup successfully!!
                </Alert>
              )}
            </Box>
            
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSave}
              disabled={isSaving || !matchTeamInfoId}
              startIcon={isSaving ? <CircularProgress size={20} /> : null}
              sx={{ minWidth: 120 }}
            >
              {isSaving ? "保存中..." : "保存阵容"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </DndProvider>
  );
};

export default LineupEditor;