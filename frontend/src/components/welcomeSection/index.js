import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

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
        <Typography variant="h3" fontWeight="bold" sx={{ mb: 4 }}>
          Welcome to SoccerSphere!
        </Typography>
        <Typography variant="h6" sx={{ mb: 6 }}>
          Join the action, manage your team, and track your performance in exciting football leagues.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            sx={{ fontSize: 16 }}
            component={Link} 
            to="/create-team">
            Create Team
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large" 
            sx={{ 
              fontSize: 16, 
              color: 'white', 
              borderColor: 'white' 
              }}
              component={Link}
            to="/create-league">
            Create League
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default WelcomeSection;
