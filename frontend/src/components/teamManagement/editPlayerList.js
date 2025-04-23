import { useState, useEffect } from "react";
import { 
  Paper, 
  Typography, 
  Divider, 
  List,
  Box,
  CircularProgress,
  Alert,
  ListItem,
  ListItemText
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { PlayerListItem } from "../editablePlayerList/PlayerListItem";
import { roleColors, roleIcons } from "../editablePlayerList/roleUtils";

export const EditablePlayerList = ({ teamId, onUpdate, onRoleChange }) => {
  const [players, setPlayers] = useState([]);
  const [rolesMap, setRolesMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [roleEditId, setRoleEditId] = useState(null);
  const [editData, setEditData] = useState({});

  // Fetch players and their roles
  const fetchPlayersAndRoles = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("authToken");

      const [participantsRes, rolesRes] = await Promise.all([
        fetchPlayers(teamId, token),
        fetchRoles(teamId, token)
      ]);

      if (!participantsRes.ok || !rolesRes.ok) {
        throw new Error("Failed to load players or roles");
      }

      const participants = await participantsRes.json();
      const rolesList = await rolesRes.json();

      processPlayerData(participants, rolesList);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to fetch players
  const fetchPlayers = async (teamId, token) => {
    return await fetch(
      `http://localhost:8080/api/participant/teams/${teamId}/participants`, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  // Helper function to fetch roles
  const fetchRoles = async (teamId, token) => {
    return await fetch(
      `http://localhost:8080/api/teams/${teamId}/members`, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  // Process and sort player data
  const processPlayerData = (participants, rolesList) => {
    const roleMap = {};
    rolesList.forEach(member => {
      roleMap[member.userId] = member.role;
    });

    const sortedPlayers = [...participants].sort(sortPlayers);
    setPlayers(sortedPlayers);
    setRolesMap(roleMap);
  };

  // Sorting logic for players
  const sortPlayers = (a, b) => {
    const numA = a.playerProfileDTO?.number || 999;
    const numB = b.playerProfileDTO?.number || 999;
    if (numA !== numB) return numA - numB;
    return (a.playerProfileDTO?.username || "").localeCompare(b.playerProfileDTO?.username || "");
  };

  // Error handling
  const handleError = (err) => {
    console.error("Error fetching player data:", err);
    setError(err.message);
  };

  useEffect(() => {
    if (teamId) {
      fetchPlayersAndRoles();
    }
  }, [teamId]);

  // Editing handlers
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

  const saveEdit = () => {
    if (onUpdate) {
      onUpdate(editingId, editData);
    }
    cancelEditing();
  };

  const saveRoleEdit = (playerId, newRole) => {
    if (onRoleChange) {
      onRoleChange(playerId, newRole);
    }
    setRolesMap(prev => ({
      ...prev,
      [playerId]: newRole
    }));
    setRoleEditId(null);
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  // Loading and error states
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