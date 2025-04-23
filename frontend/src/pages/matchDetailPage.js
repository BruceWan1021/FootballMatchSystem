import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Typography, Paper, Grid, Chip, Divider, Avatar, CircularProgress, Alert } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import MatchEvent from "../components/matchEvent";

const MatchDetailPage = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/matches/${id}`);
        if (!res.ok) throw new Error("Failed to fetch match data");
        const data = await res.json();
        setMatch(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!match) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 8 }}>
      <Paper sx={{ p: 3, borderRadius: 2 }} elevation={4}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {match.title || match.tournament?.name}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
          {match.status && (
            <Chip
              label={match.status}
              color={match.status === "COMPLETED" ? "success" : "info"}
            />
          )}
          {match.matchDate && (
            <>
              <Chip label={`📅 ${match.matchDate.split("T")[0]}`} />
              {match.matchDate.split("T")[1] && (
                <Chip label={`⏰ ${match.matchDate.split("T")[1].slice(0, 5)}`} />
              )}
            </>
          )}
          {match.location && (
            <Chip label={`📍 ${match.location}`} />
          )}
          {match.tournament?.name && (
            <Chip label={`🏆 ${match.tournament.name}`} />
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={3} alignItems="center">
          <Grid item xs={5}>
            <Box textAlign="center">
              <Avatar sx={{ bgcolor: "primary.main", mx: "auto", width: 56, height: 56 }}>
                {match.team1?.name?.charAt(0) || "A"}
              </Avatar>
              <Typography variant="subtitle1" fontWeight="bold">
                {match.team1?.name || "Team A"}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={2} textAlign="center">
            <Typography variant="h4" fontWeight="bold">
              {match.score1 ?? 0} : {match.score2 ?? 0}
            </Typography>
            <SportsSoccerIcon fontSize="large" color="primary" />
          </Grid>

          <Grid item xs={5}>
            <Box textAlign="center">
              <Avatar sx={{ bgcolor: "secondary.main", mx: "auto", width: 56, height: 56 }}>
                {match.team2?.name?.charAt(0) || "B"}
              </Avatar>
              <Typography variant="subtitle1" fontWeight="bold">
                {match.team2?.name || "Team B"}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Match Events
        </Typography>

        <MatchEvent events={match.events || []} />
      </Paper>
    </Container>
  );
};

export default MatchDetailPage;