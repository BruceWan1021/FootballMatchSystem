import React from 'react';
import {  Box,  Typography,  Avatar,  Grid,  Card,  CardContent,  Divider,  Chip,  LinearProgress,Tooltip,  useTheme,Button} from '@mui/material';
import {
  People,
  EmojiEvents as TrophyIcon,
  Equalizer as StatsIcon
} from '@mui/icons-material';

const PlayerList = ({ players, isAdmin = false, onAction }) => {
  const theme = useTheme();
  const sortedPlayers = [...players].sort((a, b) => b.rating - a.rating);

  const handleApprove = async (playerId) => {
    try {
      const res = await fetch(`/api/players/${playerId}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      if (!res.ok) throw new Error('Failed to approve');
      alert('Player approved');
      onAction?.();
    } catch (err) {
      console.error(err);
      alert('Approval failed');
    }
  };

  const handleReject = async (playerId) => {
    try {
      const res = await fetch(`/api/players/${playerId}/reject`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      if (!res.ok) throw new Error('Failed to reject');
      alert('Player rejected');
      onAction?.();
    } catch (err) {
      console.error(err);
      alert('Rejection failed');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <People sx={{ mr: 1 }} /> Squad Players
      </Typography>
      <Grid container spacing={3}>
        {sortedPlayers.map((player) => (
          <Grid item xs={12} sm={6} md={4} key={player.id}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[6],
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Chip
                    label={`#${player.number}`}
                    size="small"
                    color="primary"
                    sx={{ fontWeight: 'bold' }}
                  />
                  <Chip
                    label={player.position}
                    size="small"
                    color={
                      player.position === 'Forward' ? 'error'
                        : player.position === 'Midfielder' ? 'warning'
                        : player.position === 'Defender' ? 'info'
                        : 'success'
                    }
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: theme.palette.primary.light,
                      mb: 1,
                      fontSize: '2rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {player.number}
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">
                    {player.name}
                  </Typography>
                  <Chip
                    label={player.status}
                    size="small"
                    color={
                      player.status === 'APPROVED' ? 'success' :
                        player.status === 'PENDING' ? 'warning' : 'default'
                    }
                  />
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption">Goals</Typography>
                    <Typography fontWeight="bold">{player.goals}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption">Assists</Typography>
                    <Typography fontWeight="bold">{player.assists}</Typography>
                  </Box>
                  {player.cleanSheets !== undefined && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="caption">Clean Sheets</Typography>
                      <Typography fontWeight="bold">{player.cleanSheets}</Typography>
                    </Box>
                  )}
                </Box>

                <Tooltip title={`Rating: ${player.rating}/10`}>
                  <LinearProgress
                    variant="determinate"
                    value={player.rating * 10}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      mb: 2,
                      bgcolor: theme.palette.grey[200],
                      '& .MuiLinearProgress-bar': {
                        bgcolor: player.rating > 8 ? theme.palette.success.main :
                          player.rating > 7 ? theme.palette.primary.main :
                            theme.palette.warning.main
                      }
                    }}
                  />
                </Tooltip>

                {isAdmin && player.status === 'PENDING' && (
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      onClick={() => handleApprove(player.id)}
                    >
                      Approve
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleReject(player.id)}
                    >
                      Reject
                    </Button>
                  </Box>
                )}
              </CardContent>

              <Box
                sx={{
                  p: 2,
                  bgcolor: theme.palette.grey[100],
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  gap: 1,
                }}
              >
                <Chip
                  icon={<StatsIcon fontSize="small" />}
                  label={`Rating: ${player.rating}`}
                  size="small"
                  color={
                    player.rating > 8 ? 'success' :
                      player.rating > 7 ? 'primary' : 'warning'
                  }
                />
                {player.goals > 5 && (
                  <Chip
                    icon={<TrophyIcon fontSize="small" />}
                    label="Top Scorer"
                    size="small"
                    color="warning"
                  />
                )}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PlayerList;