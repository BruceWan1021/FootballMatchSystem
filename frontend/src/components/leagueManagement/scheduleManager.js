import React, { useEffect, useState } from "react";
import {
  Typography, Paper, List, ListItem, ListItemText, IconButton, Button, Divider
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const ScheduleManager = ({ tournamentId }) => {
  const [matches, setMatches] = useState([]);

  const loadMatches = async () => {
    const res = await fetch(`http://localhost:8080/api/tournaments/${tournamentId}/matches`);
    const data = await res.json();
    setMatches(data);
  };

  useEffect(() => {
    loadMatches();
  }, [tournamentId]);

  const regenerateSchedule = async () => {
    const token = sessionStorage.getItem("authToken");
    const res = await fetch(`http://localhost:8080/api/tournaments/${tournamentId}/generate-schedule`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    alert(data.message);
    loadMatches();
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h6" mb={2}>Match Schedule</Typography>
      <Button startIcon={<RefreshIcon />} onClick={regenerateSchedule}>
        Regenerate Schedule
      </Button>
      <List>
        {matches.map((match, index) => (
          <div key={index}>
            <ListItem>
              <ListItemText
                primary={`${match.team1.name} vs ${match.team2.name}`}
                secondary={`Time: ${new Date(match.matchDate).toLocaleString()} — Stadium: ${match.stadium}`}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Paper>
  );
};

export default ScheduleManager;
