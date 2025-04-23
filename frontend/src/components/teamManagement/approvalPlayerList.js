import React, { useEffect, useState } from "react";
import {
  Paper, Typography, List, ListItem, ListItemText, IconButton,
  Box, Divider, CircularProgress, Alert, Chip, Snackbar
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from '@mui/material/Alert';

const PlayerList = ({ teamId }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("authToken");
      const res = await fetch(`http://localhost:8080/api/participant/teams/${teamId}/participants`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to load players");
      const data = await res.json();

      const sorted = data.sort((a, b) => {
        if (a.status === "PENDING" && b.status !== "PENDING") return -1;
        if (a.status !== "PENDING" && b.status === "PENDING") return 1;
        return 0;
      });

      setPlayers(sorted);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const handleApproval = async (playerId, approve) => {
    try {
      const token = sessionStorage.getItem("authToken");
      const res = await fetch(
        `http://localhost:8080/api/participant/teams/${teamId}/participants/${playerId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: approve ? "APPROVED" : "REJECTED" })
        }
      );
      if (!res.ok) throw new Error("Failed to update player status");

      setSnackbar({
        open: true,
        message: approve ? "Player approved successfully!" : "Player rejected successfully!",
        severity: "success"
      });

      fetchPlayers();
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Operation failed. Please try again.",
        severity: "error"
      });
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, [teamId]);

  return (
    <Paper sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Team Player Management
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {loading ? (
        <Box display="flex" justifyContent="center" p={2}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : players.length === 0 ? (
        <Typography color="text.secondary">No players found.</Typography>
      ) : (
        <List>
          {players.map((player) => (
            <ListItem
              key={player.id}
              secondaryAction={
                player.status === "PENDING" && (
                  <>
                    <IconButton onClick={() => handleApproval(player.id, true)} color="success">
                      <CheckIcon />
                    </IconButton>
                    <IconButton onClick={() => handleApproval(player.id, false)} color="error">
                      <CloseIcon />
                    </IconButton>
                  </>
                )
              }
            >
              <ListItemText
                primary={`${player.playerProfileDTO?.username || "Unknown"} (#${player.playerProfileDTO?.number || "--"})`}
                secondary={
                  <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                    <Typography component="span" variant="body2" color="text.secondary">
                      {player.playerProfileDTO?.position || "No position"}
                      {player.playerProfileDTO?.height ? ` | ${player.playerProfileDTO.height}cm` : ""}
                      {player.playerProfileDTO?.weight ? ` | ${player.playerProfileDTO.weight}kg` : ""}
                    </Typography>
                    <Chip
                      label={player.status}
                      size="small"
                      color={
                        player.status === "APPROVED" ? "success" :
                          player.status === "REJECTED" ? "error" : "warning"
                      }
                    />
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          elevation={6}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Paper>
  );
};

export default PlayerList;
