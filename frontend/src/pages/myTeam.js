import React, { useState } from 'react';
import {
  Box, Typography, Avatar, Grid, Paper, Divider, Chip, Button, Stack, useTheme, Tabs, Tab
} from '@mui/material';
import { SportsSoccer, School, Event, People } from '@mui/icons-material';
import KitColorsSection from '../components/kitColorsSection';
import SquadPlayersSection from '../components/squadPlayersSection';
import UpcomingMatchesSection from '../components/upcomingMatchesSection';
import SeasonStats from '../components/seasonStats';

const MyTeamPage = () => {
  const theme = useTheme();
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const team = {
    name: 'Dream FC',
    shortName: 'DFC',
    school: 'Dream University',
    founded: '2020-08-15',
    logoUrl: 'https://via.placeholder.com/150',
    homeColors: {
      jersey: '#1e88e5',
      shorts: '#ffffff',
      socks: '#000000',
    },
    awayColors: {
      jersey: '#ff4081',
      shorts: '#eeeeee',
      socks: '#888888',
    },
    description: 'We are passionate about football and strive to win every match with teamwork, dedication and sportsmanship. Our team represents the spirit of our university both on and off the field.',
    players: [
      { id: 1, number: 7, name: 'Alice Johnson', position: 'Forward', goals: 12, assists: 4, rating: 8.2 },
      { id: 2, number: 10, name: 'Bob Smith', position: 'Midfielder', goals: 5, assists: 10, rating: 7.8 },
      { id: 3, number: 1, name: 'Charlie Brown', position: 'Goalkeeper', goals: 0, assists: 1, rating: 7.5, cleanSheets: 6 },
      { id: 4, number: 5, name: 'David Wilson', position: 'Defender', goals: 2, assists: 3, rating: 7.1 },
      { id: 5, number: 9, name: 'Eva Martinez', position: 'Forward', goals: 8, assists: 2, rating: 7.9 },
    ],
    upcomingMatches: [
      { opponent: 'Fire FC', date: '2025-04-20', location: 'Home Stadium' },
      { opponent: 'Ocean United', date: '2025-04-27', location: 'Away Stadium' },
      { opponent: 'Mountain Lions', date: '2025-05-04', location: 'Home Stadium' },
    ],
    stats: {
      wins: 8,
      draws: 2,
      losses: 1,
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}>
        {/* Header */}
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={2}>
            <Avatar src={team.logoUrl} sx={{ width: 120, height: 120, mx: 'auto', border: `4px solid ${theme.palette.primary.main}` }} />
          </Grid>
          <Grid item xs={12} md={10}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="h4" fontWeight="bold" sx={{ mr: 2 }}>{team.name}</Typography>
              <Chip label={team.shortName} color="primary" size="small" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <School color="action" fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="subtitle1" color="text.secondary">{team.school}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Event color="action" fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="subtitle2" color="text.secondary">Founded: {team.founded}</Typography>
            </Box>
            <Typography sx={{ mt: 2, p: 2, bgcolor: theme.palette.action.hover, borderRadius: 1, fontStyle: 'italic' }}>
              {team.description}
            </Typography>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Box sx={{ mt: 4 }}>
          <Tabs value={tabIndex} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
            <Tab label="Overview" />
            <Tab label="Squad" />
            <Tab label="Matches" />
          </Tabs>
        </Box>

        <Divider sx={{ my: 3 }} />

        {tabIndex === 0 && (
          <>
            {/* Stats and Kit Colors */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <SportsSoccer sx={{ mr: 1 }} /> Season Stats
              </Typography>
              <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', py: 1 }}>
                <Paper sx={{ p: 2, borderRadius: 2, minWidth: 100, textAlign: 'center' }}>
                  <Typography variant="h5" color="primary" fontWeight="bold">{team.stats.wins}</Typography>
                  <Typography variant="body2">Wins</Typography>
                </Paper>
                <Paper sx={{ p: 2, borderRadius: 2, minWidth: 100, textAlign: 'center' }}>
                  <Typography variant="h5" color="primary" fontWeight="bold">{team.stats.draws}</Typography>
                  <Typography variant="body2">Draws</Typography>
                </Paper>
                <Paper sx={{ p: 2, borderRadius: 2, minWidth: 100, textAlign: 'center' }}>
                  <Typography variant="h5" color="primary" fontWeight="bold">{team.stats.losses}</Typography>
                  <Typography variant="body2">Losses</Typography>
                </Paper>
              </Stack>
            </Box>
            <KitColorsSection homeColors={team.homeColors} awayColors={team.awayColors} />
          </>
        )}

        {tabIndex === 1 && <SquadPlayersSection players={team.players} />}

        {tabIndex === 2 && <UpcomingMatchesSection matches={team.upcomingMatches} />}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 2 }}>
          <Button variant="outlined" color="secondary">Share Team</Button>
          <Button variant="contained" color="primary">Edit Team</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default MyTeamPage;
