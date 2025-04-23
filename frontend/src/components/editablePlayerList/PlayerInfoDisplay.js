import { Box, Typography, Chip } from "@mui/material";

export const PlayerInfoDisplay = ({ player }) => {
  return (
    <Box>
      <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
        {player.playerProfileDTO?.username || 'Unknown Player'}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
        {player.playerProfileDTO?.number && (
          <Chip label={`#${player.playerProfileDTO.number}`} size="small" variant="outlined" />
        )}
        {player.playerProfileDTO?.position && (
          <Chip label={player.playerProfileDTO.position} size="small" color="secondary" />
        )}
        {player.playerProfileDTO?.height && (
          <Chip label={`${player.playerProfileDTO.height}cm`} size="small" variant="outlined" />
        )}
        {player.playerProfileDTO?.weight && (
          <Chip label={`${player.playerProfileDTO.weight}kg`} size="small" variant="outlined" />
        )}
      </Box>
    </Box>
  );
};