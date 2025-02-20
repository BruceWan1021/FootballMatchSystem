import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';

const WelcomeSection = () => {
  return (
    <Paper
      sx={{
        padding: 4,
        backgroundImage: 'url(/images/welcome-banner.jpg)', // 你可以替换为合适的欢迎图片
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
          Welcome to SoccerSphere!
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
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
