import React, { useEffect, useState } from "react";
import {
  Typography, Paper, List, ListItem, ListItemText, IconButton
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const TeamApprovalList = ({ tournamentId }) => {
  const [participants, setParticipants] = useState([]);

  const loadPendingParticipants = async () => {
    const res = await fetch(`http://localhost:8080/api/participant/tournaments/${tournamentId}/participants`);
    const data = await res.json();
    // 先把 PENDING 的排在前面
    const sorted = data.sort((a, b) => {
      if (a.status === "PENDING" && b.status !== "PENDING") return -1;
      if (a.status !== "PENDING" && b.status === "PENDING") return 1;
      return 0;
    });
    console.log(data)
    setParticipants(sorted);
  };


  const handleDecision = async (participantId, approve) => {
    const token = sessionStorage.getItem("authToken");
    const res = await fetch(`http://localhost:8080/api/participant/tournaments/${tournamentId}/participants/${participantId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ status: approve ? "APPROVED" : "REJECTED" })
    });
    if (res.ok) {
      loadPendingParticipants();
    } else {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    loadPendingParticipants();
  }, [tournamentId]);

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h6" mb={2}>Pending Teams</Typography>
      <List>
        {participants.map((participant) => (
          <ListItem key={participant.id} secondaryAction={
            <>
              <IconButton edge="end" onClick={() => handleDecision(participant.id, true)} color="success">
                <CheckIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDecision(participant.id, false)} color="error">
                <ClearIcon />
              </IconButton>
            </>
          }>
            <ListItemText
              primary={participant.teamDTO?.name ?? "Unnamed Team"}
              secondary={`Contact: ${participant.teamDTO?.contactEmail || 'N/A'}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TeamApprovalList;
