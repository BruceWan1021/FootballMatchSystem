import React, { useState } from 'react';
import { Paper, Typography, Box, Button, Avatar, Grid } from '@mui/material';

const MatchCard = ({ match }) => {
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
        <Avatar sx={{ bgcolor: 'green', width: 30, height: 30 }}>A</Avatar>
        <Typography variant="body1">{match.teamA}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
        <Avatar sx={{ bgcolor: 'red', width: 30, height: 30 }}>B</Avatar>
        <Typography variant="body1">{match.teamB}</Typography>
      </Box>

      <Typography variant="overline" sx={{ mt: 1 }}>
        {match.date} | {match.time}
      </Typography>
    </Paper>
  );
};

const UpcomingMatches = () => {
  const matches = [
    { title: 'Championship League Final', teamA: 'Team Alpha', teamB: 'Team Bravo', date: 'October 25, 2023', time: '7:00 PM', stadium: 'National Stadium' },
    { title: 'Championship League Final', teamA: 'Team Alpha', teamB: 'Team Bravo', date: 'October 26, 2023', time: '8:00 PM', stadium: 'National Stadium' },
    { title: 'Championship League Final', teamA: 'Team Delta', teamB: 'Team Echo', date: 'October 28, 2023', time: '7:30 PM', stadium: 'National Stadium' },
    { title: 'Championship League Final', teamA: 'Team Foxtrot', teamB: 'Team Golf', date: 'October 29, 2023', time: '8:30 PM', stadium: 'National Stadium' },
    { title: 'Championship League Final', teamA: 'Team Hotel', teamB: 'Team India', date: 'October 30, 2023', time: '6:00 PM', stadium: 'National Stadium' },
    { title: 'Championship League Final', teamA: 'Team Juliett', teamB: 'Team Kilo', date: 'November 1, 2023', time: '7:00 PM', stadium: 'National Stadium' },
    { title: 'Championship League Final', teamA: 'Team Lima', teamB: 'Team Mike', date: 'November 2, 2023', time: '7:30 PM', stadium: 'National Stadium' },
    { title: 'Championship League Final', teamA: 'Team November', teamB: 'Team Oscar', date: 'November 3, 2023', time: '8:00 PM', stadium: 'National Stadium' },
    { title: 'Championship League Final', teamA: 'Team Papa', teamB: 'Team Quebec', date: 'November 4, 2023', time: '8:30 PM', stadium: 'National Stadium' },
  ];

  const [scrollIndex, setScrollIndex] = useState(0);
  const scrollAmount = 200; 


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
    <Box sx={{ mb: 4}}>
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
          <Box sx={{
            display: 'flex',
            transform: `translateX(-${scrollIndex * scrollAmount}px)`,
            transition: 'transform 0.3s ease',
            flexShrink: 0, 
          }}>
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
