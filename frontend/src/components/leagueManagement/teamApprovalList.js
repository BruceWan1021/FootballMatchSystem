import React, { useEffect, useState } from "react";
import {
  Typography, Paper, List, ListItem, ListItemText, IconButton
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const TeamApprovalList = ({ tournamentId }) => {
  const [teams, setTeams] = useState([]);

  const loadPendingTeams = async () => {
    const res = await fetch(`http://localhost:8080/api/tournaments/${tournamentId}/teams?status=PENDING`);
    const data = await res.json();
    setTeams(data);
  };

  const handleDecision = async (teamId, approve) => {
    const token = sessionStorage.getItem("authToken");
    const res = await fetch(`http://localhost:8080/api/tournaments/${tournamentId}/teams/${teamId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ status: approve ? "APPROVED" : "REJECTED" })
    });
    if (res.ok) {
      loadPendingTeams();
    } else {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    loadPendingTeams();
  }, [tournamentId]);

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h6" mb={2}>Pending Teams</Typography>
      <List>
        {teams.map((team) => (
          <ListItem key={team.id} secondaryAction={
            <>
              <IconButton edge="end" onClick={() => handleDecision(team.id, true)} color="success">
                <CheckIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDecision(team.id, false)} color="error">
                <ClearIcon />
              </IconButton>
            </>
          }>
            <ListItemText
              primary={team.name}
              secondary={`Contact: ${team.contactEmail || 'N/A'}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TeamApprovalList;
