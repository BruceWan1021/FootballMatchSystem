import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Avatar, Grid, Paper, Divider, Chip, Button, Stack,
  useTheme, Tabs, Tab, CircularProgress
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { SportsSoccer, School, Event } from '@mui/icons-material';
import KitColorsSection from '../components/kitColorsSection';
import SquadPlayersSection from '../components/squadPlayersSection';
import UpcomingMatchesSection from '../components/upcomingMatchesSection';

const TeamDetailPage = () => {
  const theme = useTheme();
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    const fetchTeamDetail = async () => {
      try {
        setLoading(true);
        setError(null);
  
        const token = sessionStorage.getItem("authToken");
  
        // 1. 获取 team 基本信息
        const res = await fetch(`http://localhost:8080/api/teams/${id}`);
        if (!res.ok) throw new Error("Failed to fetch team");
        const teamData = await res.json();
  
        // 2. 获取 stats
        const statsRes = await fetch(`http://localhost:8080/api/teams/${id}/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!statsRes.ok) throw new Error("Failed to fetch team stats");
        const stats = await statsRes.json();
  
        // 3. 获取 players
        const playersRes = await fetch(`http://localhost:8080/api/profile/player/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!playersRes.ok) throw new Error("Failed to fetch players");
        const players = await playersRes.json();
        players.sort((a, b) => (a.number ?? 0) - (b.number ?? 0));
  
        const matchesRes = await fetch(`http://localhost:8080/api/matches/teams/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!matchesRes.ok) throw new Error("Failed to fetch match history");
        const upcomingMatches = await matchesRes.json();
        console.log(upcomingMatches)
  
        const enrichedTeam = {
          ...teamData,
          homeColors: {
            jersey: teamData.homeJerseyColor,
            shorts: teamData.homeShortsColor,
            socks: teamData.homeSocksColor,
          },
          awayColors: {
            jersey: teamData.awayJerseyColor,
            shorts: teamData.awayShortsColor,
            socks: teamData.awaySocksColor,
          },
          stats,
          players,
          upcomingMatches,
        };
  
        setTeam(enrichedTeam);
      } catch (err) {
        console.error(err);
        setError(err.message || "加载球队信息失败");
      } finally {
        setLoading(false);
      }
    };
  
    fetchTeamDetail();
  }, [id]);
  
  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !team) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography color="error">{error || 'Team not found'}</Typography>
      </Box>
    );
  }

  const handleJoinTeam = async () => {
    const token = sessionStorage.getItem("authToken");

    try {
      const response = await fetch(`http://localhost:8080/api/teams/${id}/join`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const message = await response.text();

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Join failed");
      }

      alert(message);
    } catch (err) {
      console.error("Join error:", err);
      alert("Error joining league: " + err.message);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={2}>
            <Avatar
              src={team.logoUrl}
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                border: `4px solid ${theme.palette.primary.main}`,
              }}
            />
          </Grid>

          <Grid item xs={12} md={10}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                mb: 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h4" fontWeight="bold" sx={{ mr: 2 }}>
                  {team.name}
                </Typography>
                {team.shortName && (
                  <Chip label={team.shortName} color="primary" size="small" />
                )}
              </Box>

              <Button onClick={handleJoinTeam} variant="contained" color="success" size="large">
                Join In
              </Button>
            </Box>

            {team.school && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <School color="action" fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle1" color="text.secondary">
                  {team.school}
                </Typography>
              </Box>
            )}

            {team.founded && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Event color="action" fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2" color="text.secondary">
                  Founded: {team.founded}
                </Typography>
              </Box>
            )}

            {team.description && (
              <Typography
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: theme.palette.action.hover,
                  borderRadius: 1,
                  fontStyle: 'italic',
                }}
              >
                {team.description}
              </Typography>
            )}
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Overview" />
            <Tab label="Squad" />
            <Tab label="Matches" />
          </Tabs>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Tab 内容 */}
        {tabIndex === 0 && (
          <>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <SportsSoccer sx={{ mr: 1 }} /> Season Stats
              </Typography>
              <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', py: 1 }}>
                <Paper sx={{ p: 2, borderRadius: 2, minWidth: 100, textAlign: 'center' }}>
                  <Typography variant="h5" color="primary" fontWeight="bold">
                    {team.stats?.wins ?? 0}
                  </Typography>
                  <Typography variant="body2">Wins</Typography>
                </Paper>
                <Paper sx={{ p: 2, borderRadius: 2, minWidth: 100, textAlign: 'center' }}>
                  <Typography variant="h5" color="primary" fontWeight="bold">
                    {team.stats?.draws ?? 0}
                  </Typography>
                  <Typography variant="body2">Draws</Typography>
                </Paper>
                <Paper sx={{ p: 2, borderRadius: 2, minWidth: 100, textAlign: 'center' }}>
                  <Typography variant="h5" color="primary" fontWeight="bold">
                    {team.stats?.losses ?? 0}
                  </Typography>
                  <Typography variant="body2">Losses</Typography>
                </Paper>
              </Stack>
            </Box>
            <KitColorsSection homeColors={team.homeColors} awayColors={team.awayColors} />
          </>
        )}

        {tabIndex === 1 && <SquadPlayersSection players={team.players || []} />}
        {tabIndex === 2 && <UpcomingMatchesSection matches={team.upcomingMatches || []} />}
      </Paper>
    </Box>
  );
};

export default TeamDetailPage;
