import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";

const UpcomingLeagues = () => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/tournaments/scheduled')
      .then(response => response.json())
      .then(data => {
        const formattedTournaments = data.map(tournament => ({
          title: tournament.name || "Unknown Name",
          image: tournament.image || "/images/footballClub.png", 
        }));
        setTournaments(formattedTournaments);
      })
      .catch(error => console.error('Error fetching tournaments:', error));
  }, []);

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        ⚽ Top 3 Leagues
      </Typography>
      <Grid container spacing={4}>
        {tournaments.slice(0, 3).map((league, index) => ( 
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={league.image}
                alt={league.title}
              />
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  {league.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UpcomingLeagues;
