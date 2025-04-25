import React from "react";
import { Box } from "@mui/material";
import PlayerCard from "./PlayerCard";

const FieldRow = ({ players, swapPlayers }) => (
  <Box display="flex" justifyContent="center" gap={2} mb={2}>
    {players.map((player, index) => (
      <PlayerCard key={`${player.id}-${index}`} player={player} onDrop={swapPlayers} />
    ))}
  </Box>
);

export default FieldRow;
