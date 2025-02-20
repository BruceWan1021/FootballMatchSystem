import React from "react";
import { Container, Typography, Grid, Paper, Box, Button, Avatar } from "@mui/material";
import WelcomeSection from "../components/welcomeSection";
import UpcomingMatches from "../components/upcomingMatch";

const HomePage = () => {
  return (
    <>
      <Container >
        <WelcomeSection />

        <UpcomingMatches />
     
        

        {/* 热门联赛 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            ⚽ Current & Upcoming Leagues
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6">Spring Cup 2024</Typography>
                <Typography variant="body2">March 1 - March 30</Typography>
                <Typography variant="body2">8 Teams Involved</Typography>
                <Button variant="outlined" color="primary" sx={{ mt: 1 }}>
                  Manage
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6">Summer League 2024</Typography>
                <Typography variant="body2">June 10 - July 20</Typography>
                <Typography variant="body2">10 Teams Registered</Typography>
                <Button variant="outlined" color="primary" sx={{ mt: 1 }}>
                  Join
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6">Autumn Tournament 2023</Typography>
                <Typography variant="body2">Completed</Typography>
                <Typography variant="body2">12 Teams Participated</Typography>
                <Button variant="outlined" color="primary" sx={{ mt: 1 }}>
                  View Results
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* 赛季统计和表现 */}
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

        {/* 最新赛事新闻 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            📢 Latest News & Announcements
          </Typography>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="body2">The Spring Cup 2024 starts next week! Register now and secure your spot.</Typography>
          </Paper>
        </Box>

        {/* 底部资源下载 */}
        <Box sx={{ mt: 6, paddingTop: 3, backgroundColor: "#f1f1f1", textAlign: "center" }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            📥 Download Official Rules & Regulations
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Button variant="outlined" color="primary" sx={{ width: "100%" }}>
                Download Match Regulations
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button variant="outlined" color="primary" sx={{ width: "100%" }}>
                Download League Rules
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button variant="outlined" color="primary" sx={{ width: "100%" }}>
                Download Code of Conduct
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
