import React from "react";
import { Container, Typography, Grid, Paper, Box, Button } from "@mui/material";
import WelcomeSection from "../components/welcomeSection";
import UpcomingMatches from "../components/matches";
import UpcomingLeagues from "../components/upcommingLeagues";
import SeasonStats from "../components/seasonStats";

const HomePage = () => {
  return (
    <Box
      sx={{
        backgroundImage: "url('/images/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        // py: 4,
      }}
    >
      <Container>
        <WelcomeSection />
        <UpcomingMatches />

        <Grid container spacing={4} sx={{ mt: 6 }}>
          <Grid item xs={12} md={5}>
            <SeasonStats />
          </Grid>
          <Grid item xs={12} md={7}>
            <UpcomingLeagues />
          </Grid>
        </Grid>

        {/* 最新赛事新闻 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            📢 Latest News & Announcements
          </Typography>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="body2">
              The Spring Cup 2024 starts next week! Register now and secure your spot.
            </Typography>
          </Paper>
        </Box>

        {/* 底部资源下载 */}
        <Box
          sx={{
            mt: 6,
            pt: 3,
            backgroundColor: "#f1f1f1",
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            📥 Official Rules & Regulations
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Button
                variant="outlined"
                color="primary"
                sx={{ width: "100%" }}
                onClick={() => window.location.href = "/files/match-regulations.pdf"}
              >
                Download Match Regulations
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="outlined"
                color="primary"
                sx={{ width: "100%" }}
                onClick={() => window.location.href = "/files/FInal Year Project.pdf"}
              >
                Download League Rules
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="outlined"
                color="primary"
                sx={{ width: "100%" }}
                onClick={() => window.location.href = "/files/code-of-conduct.pdf"}
              >
                Download Code of Conduct
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
