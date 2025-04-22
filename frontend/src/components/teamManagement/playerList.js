import React, { useEffect, useState } from "react";
import {
  Paper, Typography, List, ListItem, ListItemText, IconButton,
  TextField, Button, Grid, Box, Divider, CircularProgress, Alert
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const PlayerList = ({ teamId }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPlayer, setNewPlayer] = useState({ name: "", number: "", position: "" });
  const [error, setError] = useState(null);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("authToken");
      const res = await fetch(`http://localhost:8080/api/teams/${teamId}/players`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to load players");
      const data = await res.json();
      setPlayers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, [teamId]);

  const handleAddPlayer = async () => {
    if (!newPlayer.name || !newPlayer.number) return;
    try {
      const token = sessionStorage.getItem("authToken");
      const res = await fetch(`http://localhost:8080/api/teams/${teamId}/players`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newPlayer)
      });

      if (!res.ok) throw new Error("Failed to add player");
      setNewPlayer({ name: "", number: "", position: "" });
      fetchPlayers();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeletePlayer = async (playerId) => {
    if (!window.confirm("Are you sure you want to remove this player?")) return;
    try {
      const token = sessionStorage.getItem("authToken");
      const res = await fetch(`http://localhost:8080/api/teams/${teamId}/players/${playerId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error("Delete failed");
      fetchPlayers();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Paper sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Player List
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Name"
            fullWidth
            value={newPlayer.name}
            onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Number"
            fullWidth
            value={newPlayer.number}
            onChange={(e) => setNewPlayer({ ...newPlayer, number: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Position"
            fullWidth
            value={newPlayer.position}
            onChange={(e) => setNewPlayer({ ...newPlayer, position: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={handleAddPlayer}
            disabled={!newPlayer.name || !newPlayer.number}
          >
            Add Player
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ mb: 2 }} />

      {loading ? (
        <Box display="flex" justifyContent="center" p={2}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : players.length === 0 ? (
        <Typography color="text.secondary">No players added yet.</Typography>
      ) : (
        <List>
          {players.map((player) => (
            <ListItem
              key={player.id}
              secondaryAction={
                <IconButton edge="end" onClick={() => handleDeletePlayer(player.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={`${player.name} (#${player.number})`}
                secondary={player.position || "No position"}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default PlayerList;
