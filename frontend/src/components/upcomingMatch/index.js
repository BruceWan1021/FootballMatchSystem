import React, { useState, useEffect, useRef } from 'react';
import { Paper, Typography, Box, Button, Avatar } from '@mui/material';

const getStatusStyle = (status) => {
  const normalized = (status || '').toUpperCase();
  switch (normalized) {
    case 'IN_PROGRESS':
      return {
        label: 'Live',
        style: { color: '#f44336' }
      };
    case 'COMPLETED':
      return {
        label: 'Finishd',
        style: { color: '#9e9e9e' }
      };
    default:
      return {
        label: 'Upcoming',
        style: { color: '#4caf50' }
      };
  }
};


const MatchCard = ({ match }) => {
  if (!match || !match.teamA || !match.teamB) return null;

  const { label, style } = getStatusStyle(match.status);

  return (
    <Paper
      sx={{
        width: 190,
        padding: 2,
        borderRadius: 2,
        boxShadow: 3,
        position: 'relative',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        }
      }}
    >
      {/* 状态标签 */}
      <Box
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          px: 1,
          py: 0.3,
          borderRadius: 1,
          fontSize: '0.75rem',
          fontWeight: 600,
          ...style
        }}
      >
        {label}
      </Box>

      <Typography variant="caption" sx={{ mb: 1 }}>
        {match.title}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Avatar sx={{ bgcolor: 'green', width: 30, height: 30 }}>
          {match.teamA.charAt(0)}
        </Avatar>
        <Typography variant="body1">{match.teamA}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
        <Avatar sx={{ bgcolor: 'red', width: 30, height: 30 }}>
          {match.teamB.charAt(0)}
        </Avatar>
        <Typography variant="body1">{match.teamB}</Typography>
      </Box>

      <Typography variant="overline" sx={{ mt: 1 }}>
        {match.date} | {match.time}
      </Typography>
    </Paper>
  );
};


const UpcomingMatches = () => {
  const [matches, setMatches] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(0);
  const scrollAmount = 206;
  const visibleCount = 3;
  const autoScrollRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/matches/all')
      .then(response => response.json())
      .then(data => {
        const formattedMatches = data.map(match => ({
          title: match.tournament?.name || "Unknown Tournament",
          teamA: match.team1?.name || "Unknown Team",
          teamB: match.team2?.name || "Unknown Team",
          date: match.matchDate.split('T')[0],
          time: match.matchDate.split('T')[1].slice(0, 5),
          status: match.status || 'upcoming'
        }));
        setMatches(formattedMatches);
      })
      .catch(error => console.error('Error fetching matches:', error));
  }, []);

  useEffect(() => {
    autoScrollRef.current = setInterval(() => {
      setScrollIndex(prev =>
        matches.length === 0
          ? 0
          : (prev + 1) % (matches.length > visibleCount ? matches.length : 1)
      );
    }, 2000); // 每 2 秒滚动一次

    return () => clearInterval(autoScrollRef.current);
  }, [matches]);

  const handleScrollLeft = () => {
    setScrollIndex(prev =>
      prev === 0 ? Math.max(matches.length - visibleCount, 0) : prev - 1
    );
  };

  const handleScrollRight = () => {
    setScrollIndex(prev =>
      (prev + 1) % (matches.length > visibleCount ? matches.length : 1)
    );
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button onClick={handleScrollLeft} variant="outlined" color="primary">
          &lt; Prev
        </Button>
        <Box sx={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              transform: `translateX(-${scrollIndex * scrollAmount}px)`,
              transition: 'transform 0.5s ease',
              flexShrink: 0,
            }}
          >
            {matches.map((match, index) => (
              <Box key={index} sx={{ marginRight: '16px' }}>
                <MatchCard match={match} />
              </Box>
            ))}
          </Box>
        </Box>
        <Button onClick={handleScrollRight} variant="outlined" color="primary">
          Next &gt;
        </Button>
      </Box>
    </Box>
  );
};

export default UpcomingMatches;
