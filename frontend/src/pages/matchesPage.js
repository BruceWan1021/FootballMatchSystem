import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent, Avatar, Chip } from "@mui/material";

const MatchesPage = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/matches')
      .then(response => response.json())
      .then(data => {
        const formattedMatches = data.map(match => ({
          id: match.id,
          tournament: match.tournament?.name || "Unknown League",
          teamA: match.team1?.name || "Unknown Team",
          teamB: match.team2?.name || "Unknown Team",
          date: match.matchDate.split('T')[0], // 提取日期
          time: match.matchDate.split('T')[1].slice(0, 5), // 提取时间
          status: match.status || "Scheduled"
        }));
        setMatches(formattedMatches);
      })
      .catch(error => console.error('Error fetching matches:', error));
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        ⚽ Upcoming Matches
      </Typography>
      <Grid container spacing={3}>
        {matches.map((match) => (
          <Grid item xs={12} sm={6} md={4} key={match.id}>
            <Card sx={{ p: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {match.tournament}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: 'green', mr: 1 }}>{match.teamA.charAt(0)}</Avatar>
                    <Typography variant="body1">{match.teamA}</Typography>
                  </Box>
                  <Typography variant="h6">vs</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1">{match.teamB}</Typography>
                    <Avatar sx={{ bgcolor: 'red', ml: 1 }}>{match.teamB.charAt(0)}</Avatar>
                  </Box>
                </Box>

                <Typography variant="subtitle2" color="textSecondary">
                  📅 {match.date} | ⏰ {match.time}
                </Typography>

                <Chip
                  label={match.status}
                  color={match.status === "Scheduled" ? "primary" : "secondary"}
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MatchesPage;
