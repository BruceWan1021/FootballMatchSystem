import { useState, useEffect } from "react";
import {
  Paper, Typography, Divider, List, Box, CircularProgress, Alert, ListItem, ListItemText
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { PlayerListItem } from "../editablePlayerList/PlayerListItem";

export const EditablePlayerList = ({ teamId, onUpdate, onRoleChange }) => {
  const [players, setPlayers] = useState([]);
  const [rolesMap, setRolesMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [roleEditId, setRoleEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchPlayersAndRoles = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("authToken");

      const [participantsRes, rolesRes] = await Promise.all([
        fetch(`http://localhost:8080/api/participant/teams/${teamId}/participants`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`http://localhost:8080/api/teams/${teamId}/members`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (!participantsRes.ok || !rolesRes.ok) throw new Error("Failed to load players or roles");

      const participants = await participantsRes.json();
      const rolesList = await rolesRes.json();

      const roleMap = {};
      rolesList.forEach(member => {
        roleMap[member.userId] = member.role;
      });

      const sorted = [...participants].sort((a, b) => (a.playerProfileDTO?.number || 999) - (b.playerProfileDTO?.number || 999));
      setPlayers(sorted);
      setRolesMap(roleMap);
    } catch (err) {
      console.error("Error fetching player data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (teamId) {
      fetchPlayersAndRoles();
    }
  }, [teamId]);

  const startEditing = (player) => {
    setEditingId(player.id);
    setEditData({
      number: player.playerProfileDTO?.number || '',
      position: player.playerProfileDTO?.position || '',
      height: player.playerProfileDTO?.height || '',
      weight: player.playerProfileDTO?.weight || ''
    });
  };

  const startRoleEditing = (playerId) => {
    setRoleEditId(playerId);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setRoleEditId(null);
    setEditData({});
  };

  const saveEdit = async () => {
    if (!editingId || !teamId) return;
  
    const player = players.find(p => p.id === editingId);
    const userId = player?.playerProfileDTO?.userId;
  
    if (!userId) {
      console.error("无法找到对应的 userId");
      setError("更新失败：找不到对应用户");
      return;
    }
  
    try {
      const token = sessionStorage.getItem("authToken");
      const res = await fetch(
        `http://localhost:8080/api/profile/player/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(editData)
        }
      );
  
      if (!res.ok) throw new Error("Failed to update player info");
  
      if (onUpdate) onUpdate(editingId, editData);
      await fetchPlayersAndRoles();
    } catch (err) {
      console.error("Error updating player:", err);
      setError("更新球员信息失败！");
    } finally {
      cancelEditing();
    }
  };
  

  const saveRoleEdit = async (userId, newRole) => {
    if (!userId || !teamId) return;
  
    try {
      const token = sessionStorage.getItem("authToken");
      const res = await fetch(
        `http://localhost:8080/api/teams/${teamId}/members/${userId}/role`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ role: newRole })
        }
      );
  
      if (!res.ok) throw new Error("Failed to update role");
  
      if (onRoleChange) onRoleChange(userId, newRole);
      setRolesMap(prev => ({ ...prev, [userId]: newRole }));
    } catch (err) {
      console.error("Error updating role:", err);
      setError("更新角色失败！");
    } finally {
      setRoleEditId(null);
    }
  };
  
  const handleEditChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" component="h2" gutterBottom sx={{
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
        color: 'primary.main'
      }}>
        <SportsSoccerIcon sx={{ mr: 1 }} />
        Team Players
      </Typography>

      <Divider sx={{ my: 2 }} />

      <List sx={{ width: '100%' }}>
        {players.length > 0 ? (
          players.map((player) => {
            const userId = player.playerProfileDTO?.userId;
            return (
              <PlayerListItem
                key={player.id}
                player={player}
                role={rolesMap[userId]}
                isEditing={editingId === player.id}
                isEditingRole={roleEditId === userId}
                onStartEdit={startEditing}
                onCancelEdit={cancelEditing}
                onSaveEdit={saveEdit}
                onStartRoleEdit={startRoleEditing}
                onSaveRoleEdit={(newRole) => saveRoleEdit(userId, newRole)}
                onCancelRoleEdit={cancelEditing}
                editData={editData}
                onEditChange={handleEditChange}
              />
            );
          })
        ) : (
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="body1" color="text.secondary" align="center">
                  No players found in this team
                </Typography>
              }
            />
          </ListItem>
        )}
      </List>
    </Paper>
  );
};

export default EditablePlayerList;
