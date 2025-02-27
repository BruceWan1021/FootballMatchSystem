import React from "react";
import { Box, Paper, Typography, Grid } from "@mui/material";

const SeasonStats = () => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        🎯 Season Stats & Performance
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Player Stats</Typography>
            <Typography variant="body2">Goals: 15</Typography>
            <Typography variant="body2">Assists: 10</Typography>
            <Typography variant="body2">Yellow Cards: 2</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Team Performance</Typography>
            <Typography variant="body2">Wins: 8</Typography>
            <Typography variant="body2">Losses: 4</Typography>
            <Typography variant="body2">Goals Scored: 30</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SeasonStats;
