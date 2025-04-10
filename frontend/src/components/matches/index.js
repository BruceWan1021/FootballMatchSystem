import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Typography, Paper, IconButton, Avatar, CircularProgress, Alert, useTheme, useMediaQuery, Chip
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const CARD_WIDTH = 260;

const statusColors = {
  SCHEDULED: { bg: '#c8e6c9', color: '#2e7d32' },
  IN_PROGRESS: { bg: '#ffecb3', color: '#f57c00' },
  COMPLETED: { bg: '#e0e0e0', color: '#555' }
};

const displayStatusMap = {
  SCHEDULED: 'SCHEDULED',
  IN_PROGRESS: 'LIVE',
  COMPLETED: 'FINISHED'
};

const MatchCard = ({ match }) => {
  const statusStyle = statusColors[match.status] || statusColors['SCHEDULED'];

  return (
    <Paper
      elevation={3}
      sx={{
        minWidth: CARD_WIDTH,
        p: 2,
        mr: 2,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        }
      }}
    >
      <Box sx={{ mb: 1 }}>
        <Chip
          label={match.displayStatus}
          size="small"
          sx={{
            fontSize: '0.7rem',
            backgroundColor: statusStyle.bg,
            color: statusStyle.color,
            mb: 1,
            height: 24,
            fontWeight: 'bold',
            borderRadius: '6px',
            alignSelf: 'flex-start'
          }}
        />
        <Typography variant="subtitle2" fontWeight="bold" noWrap>
          {match.title}
        </Typography>
      </Box>

      <Box>
        {[match.teamA, match.teamB].map((team, idx) => (
          <Box key={idx} sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
            <Avatar sx={{
              width: 28, height: 28, mr: 1,
              bgcolor: idx === 0 ? 'primary.main' : 'secondary.main'
            }}>
              {team.charAt(0)}
            </Avatar>
            <Typography variant="body2" fontWeight={500} noWrap>{team}</Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          backgroundColor: 'grey.100',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 1,
          px: 1,
          py: 0.5,
          mt: 2
        }}
      >
        <Typography variant="caption" fontWeight="bold">{match.date}</Typography>
        <Typography variant="caption" fontWeight="bold">{match.time}</Typography>
      </Box>
    </Paper>
  );
};

const UpcomingMatches = () => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const cardsToShow = isMobile ? 1 : 4;
  const autoScrollRef = useRef(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/api/matches/all');
        if (!response.ok) throw new Error('Failed to fetch matches');
        const data = await response.json();

        const formatted = data.map(match => {
          const status = match.status || 'SCHEDULED';
          return {
            title: match.tournament?.name || 'Unknown League',
            teamA: match.team1?.name || 'Team A',
            teamB: match.team2?.name || 'Team B',
            date: new Date(match.matchDate).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit'
            }),
            time: new Date(match.matchDate).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }),
            status,
            displayStatus: displayStatusMap[status] || 'SCHEDULED'
          };
        });

        setMatches(formatted);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  useEffect(() => {
    autoScrollRef.current = setInterval(() => {
      setScrollIndex(prev => {
        const maxIndex = Math.max(matches.length - cardsToShow, 0);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 3000);

    return () => clearInterval(autoScrollRef.current);
  }, [matches, cardsToShow]);

  const handleScroll = (dir) => {
    if (dir === 'left') {
      setScrollIndex(prev => Math.max(prev - 1, 0));
    } else {
      setScrollIndex(prev => {
        const maxIndex = Math.max(matches.length - cardsToShow, 0);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Alert severity="error" sx={{ my: 2 }}>Failed to load matches: {error}</Alert>;
  }

  if (matches.length === 0) {
    return <Box sx={{ textAlign: 'center', py: 4 }}><Typography>No upcoming matches</Typography></Box>;
  }

  return (
    <Box sx={{ position: 'relative', py: 2, px: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Upcoming Matches
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => handleScroll('left')} disabled={scrollIndex === 0}>
          <ChevronLeft />
        </IconButton>

        <Box sx={{ overflow: 'hidden', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              transition: 'transform 0.5s ease',
              transform: `translateX(-${scrollIndex * (CARD_WIDTH + 16)}px)`
            }}
          >
            {matches.map((match, index) => (
              <MatchCard key={index} match={match} />
            ))}
          </Box>
        </Box>

        <IconButton
          onClick={() => handleScroll('right')}
          disabled={scrollIndex >= matches.length - cardsToShow}
        >
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
};

export default UpcomingMatches;