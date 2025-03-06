import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, Button, Avatar } from '@mui/material';

const MatchCard = ({ match }) => {
  if (!match || !match.teamA || !match.teamB) {
    return null; // 避免渲染错误
  }

  return (
    <Paper
      sx={{
        width: 190,
        padding: 2,
        borderRadius: 2,
        boxShadow: 3,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        }
      }}
    >
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
  const scrollAmount = 200;

  useEffect(() => {
    fetch('http://localhost:8080/api/matches/scheduled')
      .then(response => response.json())
      .then(data => {
        const formattedMatches = data.map(match => ({
          title: match.tournament?.name || "Unknown Tournament",
          teamA: match.team1?.name || "Unknown Team",
          teamB: match.team2?.name || "Unknown Team",
          date: match.matchDate.split('T')[0], // 提取日期部分
          time: match.matchDate.split('T')[1].slice(0, 5), // 提取时间（去掉秒）
        }));
        setMatches(formattedMatches);
      })
      .catch(error => console.error('Error fetching matches:', error));
  }, []);

  const handleScrollLeft = () => {
    if (scrollIndex > 0) {
      setScrollIndex(scrollIndex - 1);
    }
  };

  const handleScrollRight = () => {
    if (scrollIndex < matches.length - 3) {
      setScrollIndex(scrollIndex + 1);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button
          onClick={handleScrollLeft}
          variant="outlined"
          color="primary"
          disabled={scrollIndex === 0}
        >
          &lt; Prev
        </Button>
        <Box sx={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              transform: `translateX(-${scrollIndex * scrollAmount}px)`,
              transition: 'transform 0.3s ease',
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
        <Button
          onClick={handleScrollRight}
          variant="outlined"
          color="primary"
          disabled={scrollIndex >= matches.length - 3}
        >
          Next &gt;
        </Button>
      </Box>
    </Box>
  );
};

export default UpcomingMatches;
