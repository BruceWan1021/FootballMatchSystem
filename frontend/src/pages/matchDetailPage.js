import React from "react";
import { Box, Container, Typography, Paper, Grid, Chip, Divider, Avatar, Button } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MatchEvent from "../components/matchEvent";

const mockMatch = {
  id: 1,
  title: "Spring Cup - Group A",
  status: "COMPLETED",
  date: "2025-04-20",
  time: "16:00",
  location: "Main Campus Stadium A",
  tournament: "2025 Spring Cup",
  teamA: {
    name: "Computer Science Team",
    score: 2,
    players: ["Alice", "Bob", "Charlie"]
  },
  teamB: {
    name: "Information Engineering Team",
    score: 1,
    players: ["David", "Eve", "Frank"]
  },
  events: [
    { time: "55'", type: "goal", team: "A", player: "Andrei Santos" },
    { time: "60'", type: "goal", team: "A", player: "Bakawa" },
    { time: "62'", type: "goal", team: "B", player: "Torres" },
    { time: "73'", type: "goal", team: "A", player: "Emeka" },
    { time: "89'", type: "goal", team: "A", player: "Amiyah" },
    { time: "90+6'", type: "penalty", team: "B", player: "Mikautadze" },
  ]
};

const MatchDetailPage = () => {
  const match = mockMatch;

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 8 }}>

      <Paper sx={{ p: 3, borderRadius: 2 }} elevation={4}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {match.title}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
          <Chip label={match.status} color={match.status === "COMPLETED" ? "success" : "info"} />
          <Chip label={`📅 ${match.date}`} />
          <Chip label={`⏰ ${match.time}`} />
          <Chip label={`📍 ${match.location}`} />
          <Chip label={`🏆 ${match.tournament}`} />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={3} alignItems="center">
          <Grid item xs={5}>
            <Box textAlign="center">
              <Avatar sx={{ bgcolor: "primary.main", mx: "auto", width: 56, height: 56 }}>
                {match.teamA.name.charAt(0)}
              </Avatar>
              <Typography variant="subtitle1" fontWeight="bold">
                {match.teamA.name}
              </Typography>
              {match.teamA.players.map((p, i) => (
                <Typography key={i} variant="body2">{p}</Typography>
              ))}
            </Box>
          </Grid>

          <Grid item xs={2} textAlign="center">
            <Typography variant="h4" fontWeight="bold">
              {match.teamA.score} : {match.teamB.score}
            </Typography>
            <SportsSoccerIcon fontSize="large" color="primary" />
          </Grid>

          <Grid item xs={5}>
            <Box textAlign="center">
              <Avatar sx={{ bgcolor: "secondary.main", mx: "auto", width: 56, height: 56 }}>
                {match.teamB.name.charAt(0)}
              </Avatar>
              <Typography variant="subtitle1" fontWeight="bold">
                {match.teamB.name}
              </Typography>
              {match.teamB.players.map((p, i) => (
                <Typography key={i} variant="body2">{p}</Typography>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Match Events
        </Typography>

        <MatchEvent events={match.events} />
      </Paper>
    </Container>
  );
};

export default MatchDetailPage;
