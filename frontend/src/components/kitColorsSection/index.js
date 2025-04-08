import React from 'react';
import { Box, Typography, Grid, Paper, Stack, useTheme } from '@mui/material';

const ColorBlock = ({ color, label }) => {
  const theme = useTheme();
  return (
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
};

const KitColorsSection= ({ homeColors, awayColors }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Kit Colors
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>Home Kit</Typography>
            <Stack direction="row" spacing={3} justifyContent="center">
              <ColorBlock color={homeColors.jersey} label="Jersey" />
              <ColorBlock color={homeColors.shorts} label="Shorts" />
              <ColorBlock color={homeColors.socks} label="Socks" />
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>Away Kit</Typography>
            <Stack direction="row" spacing={3} justifyContent="center">
              <ColorBlock color={awayColors.jersey} label="Jersey" />
              <ColorBlock color={awayColors.shorts} label="Shorts" />
              <ColorBlock color={awayColors.socks} label="Socks" />
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default KitColorsSection;
