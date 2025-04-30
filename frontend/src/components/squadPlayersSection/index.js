import React from 'react';
import {
  Grid, Card, CardContent, Avatar, Typography, Box, Chip, Divider, useTheme
} from '@mui/material';

const SquadPlayersSection = ({ players }) => {
  const theme = useTheme();

  // 默认按球衣号排序（如你之前要求）
  const sortedPlayers = [...players].sort((a, b) => (a.number ?? 0) - (b.number ?? 0));

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Squad Players</Typography>
      <Grid container spacing={3}>
        {sortedPlayers.map((player) => (
          <Grid item xs={12} sm={6} md={4} key={player.id}>
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Chip label={`#${player.number}`} size="small" color="primary" />
                  <Chip
                    label={player.position}
                    size="small"
                    color={
                      player.position === 'Forward' ? 'error' :
                      player.position === 'Midfielder' ? 'warning' :
                      player.position === 'Defender' ? 'info' : 'success'}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 1,
                    mb: 2
                  }}
                >
                  <Avatar sx={{ width: 80, height: 80, bgcolor: theme.palette.primary.light, fontSize: '2rem' }}>
                    {player.number}
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">{player.name}</Typography>
                  <Typography variant="body2" color="text.secondary">@{player.username}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption">Height</Typography>
                    <Typography fontWeight="bold">{player.height ? `${player.height} cm` : '--'}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption">Weight</Typography>
                    <Typography fontWeight="bold">{player.weight ? `${player.weight} kg` : '--'}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SquadPlayersSection;
