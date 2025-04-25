import React from "react";
import { Box, Typography } from "@mui/material";
import PlayerCard from "./PlayerCard";

const SubstituteBench = ({ players, swapPlayers }) => (
  <Box mt={2}>
    <Typography variant="subtitle1" gutterBottom>
      替补席
    </Typography>
    <Box display="flex" gap={2} flexWrap="wrap">
      {players.map((player, index) => (
        <PlayerCard key={`${player.id}-sub-${index}`} player={player} onDrop={swapPlayers} />
      ))}
    </Box>
  </Box>
);

export default SubstituteBench;
