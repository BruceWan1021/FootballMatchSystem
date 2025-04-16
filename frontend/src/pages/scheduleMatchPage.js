import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Box,
  MenuItem,
  TextField,
  List,
  ListItem,
  ListItemText
} from "@mui/material";

const mockTournaments = [
  {
    id: 1,
    name: "Spring League 2025",
    matchFormat: "ROUND_ROBIN",
    teams: [
      { id: 1, name: "Team A" },
      { id: 2, name: "Team B" },
      { id: 3, name: "Team C" },
      { id: 4, name: "Team D" }
    ]
  }
];

const ScheduleMatchPage = () => {
  const [selectedTournamentId, setSelectedTournamentId] = useState("");
  const [generatedMatches, setGeneratedMatches] = useState([]);

  const selectedTournament = mockTournaments.find(t => t.id === parseInt(selectedTournamentId));

  const generateMatches = () => {
    if (!selectedTournament) return;
    const { matchFormat, teams } = selectedTournament;
    const matches = [];

    if (matchFormat === "ROUND_ROBIN") {
      for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
          matches.push({ teamA: teams[i], teamB: teams[j] });
        }
      }
    } else if (matchFormat === "SINGLE_ELIMINATION") {
      // 简单处理为第一轮配对
      for (let i = 0; i < teams.length; i += 2) {
        if (teams[i + 1]) {
          matches.push({ teamA: teams[i], teamB: teams[i + 1] });
        }
      }
    } else {
      alert("Match format not supported yet.");
    }

    setGeneratedMatches(matches);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Auto Schedule Matches (Mock)
        </Typography>

        <Box sx={{ mt: 2 }}>
          <TextField
            select
            label="Select Tournament"
            value={selectedTournamentId}
            onChange={(e) => setSelectedTournamentId(e.target.value)}
            fullWidth
          >
            {mockTournaments.map((t) => (
              <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
            ))}
          </TextField>
        </Box>

        {selectedTournament && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              Format: <strong>{selectedTournament.matchFormat.replace("_", " ")}</strong>
            </Typography>
            <Typography variant="body1">
              Teams: {selectedTournament.teams.map(t => t.name).join(", ")}
            </Typography>
          </Box>
        )}

        <Button
          sx={{ mt: 3 }}
          variant="contained"
          onClick={generateMatches}
          disabled={!selectedTournamentId}
        >
          Generate Matches
        </Button>

        {generatedMatches.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Generated Matches</Typography>
            <List>
              {generatedMatches.map((match, idx) => (
                <ListItem key={idx} divider>
                  <ListItemText
                    primary={`${match.teamA.name} vs ${match.teamB.name}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ScheduleMatchPage;
