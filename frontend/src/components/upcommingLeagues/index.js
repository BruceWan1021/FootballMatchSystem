import React from "react";
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from "@mui/material";

const upcomingLeagues = [
  {
    title: "Spring Cup 2024",
    description: "An exciting tournament featuring local high schools.",
    image: "/images/spring-cup.jpg",
  },
  {
    title: "Summer League 2024",
    description: "A prestigious competition among college teams.",
    image: "/images/summer-league.jpg",
  },
  {
    title: "Autumn Tournament 2023",
    description: "A thrilling championship showcasing young talent.",
    image: "/images/autumn-tournament.jpg",
  },
];

const UpcomingLeagues = () => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        ⚽ Upcoming Leagues
      </Typography>
      <Grid container spacing={4}>
        {upcomingLeagues.map((league, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={league.image}
                alt={league.title}
              />
              <CardContent>
                <Typography variant="subtitile" gutterBottom>
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
