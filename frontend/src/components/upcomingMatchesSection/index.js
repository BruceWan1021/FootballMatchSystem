import React from 'react';
import {
  Box, Typography, Grid, Paper, Button, useTheme
} from '@mui/material';
import { Event, SportsSoccer } from '@mui/icons-material';
import dayjs from 'dayjs';

const UpcomingMatchesSection = ({ matches }) => {
  const theme = useTheme();

  const getMatchScoreLabel = (match) => {
    if (match.status === "IN_PROGRESS") return "Live Score";
    if (match.status === "COMPLETED") return "Final Score";
    return null;
  };

  const shouldShowScore = (match) => {
    return match.status === "IN_PROGRESS" || match.status === "COMPLETED";
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {matches.map((match, idx) => (
          <Grid item xs={12} sm={6} md={6} key={idx}>
            <Paper elevation={2} sx={{
              p: 3,
              borderRadius: 2,
              borderLeft: `4px solid ${theme.palette.primary.main}`,
              '&:hover': {
                boxShadow: theme.shadows[4]
              }
            }}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                {match.team1.name} vs {match.team2.name}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Event color="action" fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">
                  {dayjs(match.matchDate).format('YYYY-MM-DD HH:mm')}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SportsSoccer color="action" fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">{match.stadium}</Typography>
              </Box>

              {shouldShowScore(match) && (
                <Typography variant="body2" sx={{ mt: 1, color: match.status === "IN_PROGRESS" ? theme.palette.warning.main : theme.palette.text.primary }}>
                  {getMatchScoreLabel(match)}: <strong>{match.score1} - {match.score2}</strong>
                </Typography>
              )}

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
