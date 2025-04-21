import React, { useEffect, useState } from "react";
import {
  Typography, Paper, List, ListItem, ListItemText, IconButton, Button, Divider
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const ScheduleManager = ({ tournamentId }) => {
  const [matches, setMatches] = useState([]);

  const loadMatches = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/matches/tournaments/${tournamentId}`, {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("authToken")}`
        }
      });

      if (!res.ok) {
        const text = await res.text(); 
        throw new Error(`Failed to load matches: ${res.status} - ${text}`);
      }

      const data = await res.json();
      setMatches(data);
    } catch (err) {
      console.error(err);
      alert(err.message);
      setMatches([]); 
    }
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

    if (!res.ok) {
      const text = await res.text();
      alert(`Failed to regenerate: ${text}`);
      return;
    }

    let data;
    try {
      data = await res.json();
      alert(data.message || "Schedule regenerated");
    } catch (e) {
      alert("Schedule regenerated, but no message returned.");
    }

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
                primary={`Round ${match.round}: ${match.team1.name} vs ${match.team2.name}`}
                secondary={`Time: ${new Date(match.matchDate).toLocaleString()}`}
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
