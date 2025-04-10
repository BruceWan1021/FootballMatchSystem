import React from "react";
import { Card, CardContent, Typography, Grid, Chip, Box, Divider, Stack, Avatar, LinearProgress, useTheme, Tooltip } from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SpeedIcon from '@mui/icons-material/Speed';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { styled } from '@mui/material/styles';

// Custom styled components
const StatCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  textAlign: 'center',
  transition: 'all 0.3s ease',
  border: `1px solid ${theme.palette.divider}`,
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
    borderColor: theme.palette.primary.main,
  }
}));

const ValueIndicator = styled('div')(({ theme, trend }) => ({
  width: 24,
  height: 24,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  background: trend === 'up'
    ? 'rgba(46, 125, 50, 0.1)'
    : trend === 'down'
      ? 'rgba(211, 47, 47, 0.1)'
      : 'rgba(158, 158, 158, 0.1)',
  color: trend === 'up'
    ? theme.palette.success.main
    : trend === 'down'
      ? theme.palette.error.main
      : theme.palette.text.secondary,
  fontSize: '0.75rem',
  fontWeight: 'bold',
}));

const MyStats = ({ stats = {}, skills = [], honors = [], ranking = null }) => {
  const theme = useTheme();

  return (
    <Card sx={{
      mt: 3,
      borderRadius: 4,
      boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
      background: 'linear-gradient(to bottom right, #f9f9f9, #ffffff)',
      border: '1px solid rgba(0, 0, 0, 0.05)'
    }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 4,
          gap: 2
        }}>
          <Avatar sx={{
            bgcolor: 'primary.main',
            width: 48,
            height: 48,
            boxShadow: '0 4px 12px rgba(63, 81, 181, 0.3)'
          }}>
            <SpeedIcon fontSize="medium" />
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Performance Highlights
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Key metrics and achievements
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {Object.entries(stats).map(([label, value]) => {
            const isGrowth = label.includes('Growth');
            const trend = isGrowth
              ? parseFloat(value) > 0 ? 'up' : parseFloat(value) < 0 ? 'down' : 'neutral'
              : null;

            return (
              <Grid item xs={6} sm={4} md={3} key={label}>
                <Tooltip title={label.replace(/([A-Z])/g, ' $1')} arrow>
                  <StatCard>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      color="text.primary"
                      sx={{ mb: 0.5 }}
                    >
                      {value}
                    </Typography>

                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{
                        mt: 1,
                        fontWeight: 500,
                        fontSize: '0.8125rem'
                      }}
                    >
                      {label.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </Typography>

                    {isGrowth && (
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: 1,
                        gap: 0.5
                      }}>
                        <ValueIndicator trend={trend}>
                          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
                        </ValueIndicator>
                        <Typography
                          variant="caption"
                          color={
                            trend === 'up'
                              ? 'success.main'
                              : trend === 'down'
                                ? 'error.main'
                                : 'text.secondary'
                          }
                          fontWeight="bold"
                        >
                          {`${parseFloat(value) > 0 ? '+' : ''}${value}`}
                        </Typography>
                      </Box>
                    )}
                  </StatCard>
                </Tooltip>
              </Grid>
            );
          })}
        </Grid>

        {honors.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Divider sx={{ mb: 2 }}>
              <Chip
                label="Achievements"
                color="warning"
                icon={<EmojiEventsIcon fontSize="small" />}
                sx={{ px: 1 }}
              />
            </Divider>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {honors.map((honor, index) => (
                <Chip
                  key={index}
                  icon={<EmojiEventsIcon fontSize="small" />}
                  label={honor}
                  color="warning"
                  variant="outlined"
                  sx={{
                    bgcolor: 'rgba(255, 167, 38, 0.1)',
                    borderColor: 'rgba(255, 167, 38, 0.3)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 167, 38, 0.2)',
                    }
                  }}
                />
              ))}
            </Stack>
          </Box>
        )}

        {ranking && (
          <Box sx={{ mt: 4 }}>
            <Divider sx={{ mb: 2 }}>
              <Chip
                label="Ranking"
                color="secondary"
                icon={<BarChartIcon fontSize="small" />}
                sx={{ px: 1 }}
              />
            </Divider>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2,
              borderRadius: 3,
              bgcolor: 'rgba(156, 39, 176, 0.05)',
              border: '1px solid rgba(156, 39, 176, 0.2)',
              boxShadow: '0 2px 8px rgba(156, 39, 176, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(156, 39, 176, 0.15)',
              }
            }}>
              <Avatar sx={{
                bgcolor: 'secondary.main',
                width: 48,
                height: 48,
                boxShadow: '0 4px 12px rgba(156, 39, 176, 0.3)'
              }}>
                <BarChartIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Top {ranking.top} in {ranking.category}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {ranking.note}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MyStats;