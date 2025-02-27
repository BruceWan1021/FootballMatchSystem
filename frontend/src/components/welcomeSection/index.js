import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';

const WelcomeSection = () => {
  return (
    <Paper
      sx={{
        height: 300,
        mb: 4,
        padding: 4,
        backgroundImage: 'url("/images/welcomSection.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" fontWeight="bold" sx={{ mb: 8 }}>
          Welcome to SoccerSphere!
        </Typography>
        <Typography variant="h6" sx={{ mb: 8 }}>
          Join the action, manage your team, and track your performance in exciting football leagues.
        </Typography>
        <Button variant="contained" color="primary" size="large" sx={{ fontSize: 16 }}>
          Start Your Journey
        </Button>
      </Box>
    </Paper>
  );
};

export default WelcomeSection;
