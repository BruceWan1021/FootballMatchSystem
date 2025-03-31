import React from "react";
import { Box, Typography } from "@mui/material";

const getEventIcon = (type) => {
  switch (type) {
    case "goal":
      return "⚽";
    case "penalty":
      return "🔴";
    case "yellow":
      return "🟨";
    case "red":
      return "🟥";
    case "sub":
      return "🔄";
    default:
      return "⚽";
  }
};

const MatchEvent = ({ events }) => {
  if (!events || events.length === 0) {
    return <Typography>No events recorded.</Typography>;
  }

  return (
    <Box
      sx={{
        position: "relative",
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Vertical center line */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "4px",
          backgroundColor: "#4caf50",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 0,
        }}
      />

      {events.map((e, idx) => (
        <Box
          key={idx}
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
            position: "relative",
            mb: 2,
          }}
        >
          {/* Left team (A) */}
          <Box sx={{ width: "40%", textAlign: "right", pr: 2 }}>
            {e.team === "A" && (
              <Typography>
                {e.player} {getEventIcon(e.type)}
              </Typography>
            )}
          </Box>

          {/* Time badge */}
          <Box
            sx={{
              background: "#4caf50",
              color: "#fff",
              fontWeight: 600,
              px: 1.5,
              py: 0.3,
              borderRadius: "999px",
              minWidth: 48,
              textAlign: "center",
              zIndex: 1,
            }}
          >
            {e.time}
          </Box>

          {/* Right team (B) */}
          <Box sx={{ width: "40%", textAlign: "left", pl: 2 }}>
            {e.team === "B" && (
              <Typography>
                {getEventIcon(e.type)} {e.player}
              </Typography>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default MatchEvent;
