import React from 'react';
import {
  Box, Typography, Grid, Paper, Button, useTheme
} from '@mui/material';
import { Event, SportsSoccer } from '@mui/icons-material';

const UpcomingMatchesSection = ({ matches }) => {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Upcoming Matches</Typography>
      <Grid container spacing={2}>
        {matches.map((match, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Paper elevation={2} sx={{
              p: 3,
              borderRadius: 2,
              borderLeft: `4px solid ${theme.palette.primary.main}`,
              '&:hover': {
                boxShadow: theme.shadows[4]
              }
            }}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                vs {match.opponent}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Event color="action" fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">{match.date}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SportsSoccer color="action" fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">{match.location}</Typography>
              </Box>
              <Button
                variant="contained"
                size="small"
                sx={{ mt: 2 }}
                fullWidth
              >
                View Details
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UpcomingMatchesSection;
