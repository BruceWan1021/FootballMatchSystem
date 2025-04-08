import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
  Stack,
  useTheme,
  Card,
  CardContent,
  LinearProgress,
  Tooltip
} from '@mui/material';
import { 
  SportsSoccer, 
  School, 
  Event, 
  People,
  EmojiEvents as TrophyIcon,
  Equalizer as StatsIcon,
  LocationCity as StadiumIcon
} from '@mui/icons-material';

const MyTeamPage = () => {
  const theme = useTheme();
  
  // 模拟数据
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

  // 按评分排序球员
  const sortedPlayers = [...team.players].sort((a, b) => b.rating - a.rating);

  const ColorBlock = ({ color, label }) => (
    <Box textAlign="center">
      <Box sx={{
        width: 50,
        height: 50,
        backgroundColor: color,
        borderRadius: 1,
        border: '1px solid #ccc',
        mb: 1,
        boxShadow: theme.shadows[2],
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)'
        }
      }} />
      <Typography variant="caption" color="text.secondary">{label}</Typography>
    </Box>
  );

  const StatCard = ({ value, label, icon }) => (
    <Paper elevation={2} sx={{ 
      p: 2, 
      textAlign: 'center',
      borderRadius: 2,
      bgcolor: theme.palette.background.paper,
      minWidth: 100
    }}>
      <Typography variant="h5" fontWeight="bold" color="primary">{value}</Typography>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      {icon}
    </Paper>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Paper elevation={3} sx={{ 
        p: { xs: 2, md: 4 }, 
        borderRadius: 3,
        background: `linear-gradient(to bottom right, ${theme.palette.background.paper}, ${theme.palette.background.default})`
      }}>
        {/* Team Header */}
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={2}>
            <Avatar 
              src={team.logoUrl} 
              sx={{ 
                width: 120, 
                height: 120, 
                mx: 'auto',
                border: `4px solid ${theme.palette.primary.main}`,
                boxShadow: theme.shadows[4]
              }} 
            />
          </Grid>
          <Grid item xs={12} md={10}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="h4" fontWeight="bold" sx={{ mr: 2 }}>{team.name}</Typography>
              <Chip 
                label={team.shortName} 
                color="primary" 
                size="small" 
                sx={{ fontWeight: 'bold' }} 
              />
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <School color="action" fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="subtitle1" color="text.secondary">{team.school}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Event color="action" fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="subtitle2" color="text.secondary">Founded: {team.founded}</Typography>
            </Box>
            
            <Typography sx={{ 
              mt: 2, 
              p: 2, 
              bgcolor: theme.palette.action.hover, 
              borderRadius: 1,
              fontStyle: 'italic'
            }}>
              {team.description}
            </Typography>
          </Grid>
        </Grid>

        {/* Stats Section */}
        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <SportsSoccer sx={{ mr: 1 }} /> Season Stats
          </Typography>
          <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', py: 1 }}>
            <StatCard value={team.stats.wins} label="Wins" icon={<SportsSoccer color="success" />} />
            <StatCard value={team.stats.draws} label="Draws" icon={<SportsSoccer color="warning" />} />
            <StatCard value={team.stats.losses} label="Losses" icon={<SportsSoccer color="error" />} />
            <StatCard value={team.players.length} label="Players" icon={<People color="info" />} />
          </Stack>
        </Box>

        <Divider sx={{ my: 4, borderWidth: 1 }} />

        {/* Kit Colors */}
        <Box>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <SportsSoccer sx={{ mr: 1 }} /> Kit Colors
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>Home Kit</Typography>
                <Stack direction="row" spacing={3} justifyContent="center">
                  <ColorBlock color={team.homeColors.jersey} label="Jersey" />
                  <ColorBlock color={team.homeColors.shorts} label="Shorts" />
                  <ColorBlock color={team.homeColors.socks} label="Socks" />
                </Stack>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>Away Kit</Typography>
                <Stack direction="row" spacing={3} justifyContent="center">
                  <ColorBlock color={team.awayColors.jersey} label="Jersey" />
                  <ColorBlock color={team.awayColors.shorts} label="Shorts" />
                  <ColorBlock color={team.awayColors.socks} label="Socks" />
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 4, borderWidth: 1 }} />

        {/* Players Section - Modified to match TeamList style */}
        <Box>
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
                      boxShadow: theme.shadows[6]
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    {/* Player Number and Position */}
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
                          player.position === 'Forward' ? 'error' :
                          player.position === 'Midfielder' ? 'warning' :
                          player.position === 'Defender' ? 'info' : 'success'
                        }
                      />
                    </Box>

                    {/* Player Info */}
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
                      <Avatar
                        sx={{
                          width: 80,
                          height: 80,
                          bgcolor: theme.palette.primary.light,
                          mb: 1,
                          fontSize: '2rem',
                          fontWeight: 'bold'
                        }}
                      >
                        {player.number}
                      </Avatar>
                      <Typography variant="h6" fontWeight="bold">
                        {player.name}
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 1 }} />

                    {/* Player Stats */}
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

                    {/* Rating Progress Bar */}
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
                  </CardContent>

                  {/* Player Footer */}
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: theme.palette.grey[100],
                      display: 'flex',
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                      gap: 1
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

        <Divider sx={{ my: 4, borderWidth: 1 }} />

        {/* Upcoming Matches */}
        <Box>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Event sx={{ mr: 1 }} /> Upcoming Matches
          </Typography>
          <Grid container spacing={2}>
            {team.upcomingMatches.map((match, idx) => (
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

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 2 }}>
          <Button variant="outlined" color="secondary">
            Share Team
          </Button>
          <Button variant="contained" color="primary" sx={{ px: 4 }}>
            Edit Team
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default MyTeamPage;