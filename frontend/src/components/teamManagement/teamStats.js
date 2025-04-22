import React, { useEffect, useState } from "react";
import {
  Paper, Typography, Grid, CircularProgress, Alert, Box
} from "@mui/material";

const TeamStats = ({ teamId }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = sessionStorage.getItem("authToken");
      const res = await fetch(`http://localhost:8080/api/teams/${teamId}/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error("Failed to fetch team stats");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [teamId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">{error}</Alert>
    );
  }

  if (!stats) return null;

  const winRate = ((stats.wins / stats.matchesPlayed) * 100).toFixed(1);
  const goalDiff = stats.goalsFor - stats.goalsAgainst;

  return (
    <Paper sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Team Statistics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1">Matches Played</Typography>
          <Typography variant="h6">{stats.matchesPlayed}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1">Wins / Draws / Losses</Typography>
          <Typography variant="h6">
            {stats.wins} / {stats.draws} / {stats.losses}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1">Win Rate</Typography>
          <Typography variant="h6">{winRate}%</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1">Goals Scored</Typography>
          <Typography variant="h6">{stats.goalsFor}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1">Goals Conceded</Typography>
          <Typography variant="h6">{stats.goalsAgainst}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1">Goal Difference</Typography>
          <Typography variant="h6">{goalDiff}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TeamStats;
