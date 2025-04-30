import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

// 获取事件图标
const getEventIcon = (type) => {
  switch (type) {
    case "GOAL":
      return "⚽";  // 进球
    case "ASSIST":
      return "⚡";  // 助攻
    case "YELLOW_CARD":
      return "🟨";  // 黄牌
    case "RED_CARD":
      return "🟥";  // 红牌
    case "SUBSTITUTION":
      return "🔄";  // 换人
    case "PENALTY":
      return "🔴";  // 点球
    case "EXTRA_TIME":
      return "⏱️";  // 加时赛
    default:
      return "⚽";  // 默认进球图标
  }
};


const MatchEvent = ({ match }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/api/matches/${match.id}/events`);

        if (!response.ok) {
          throw new Error("Failed to fetch match events");
        }

        const data = await response.json();
        console.log(match);
        console.log(data);

        const filteredAndSorted = data
          .filter(event => event.teamId === match.team1.id || event.team_id === match.team2.id)
          .sort((a, b) => a.eventTime - b.eventTime);
        setEvents(filteredAndSorted);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchEvents();
  }, [match.id]);


  if (loading) {
    return <Typography>Loading match events...</Typography>;
  }

  if (error) {
    return <Typography>No events recorded.</Typography>;
  }

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
            {e.teamId === match.team1.id && (
              <Typography>
                {e.playerNumber} {getEventIcon(e.eventType)}
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
            {e.eventTime}
          </Box>

          {/* Right team (B) */}
          <Box sx={{ width: "40%", textAlign: "left", pl: 2 }}>
            {e.teamId === match.team2.id && (
              <Typography>
                {getEventIcon(e.eventType)} {e.playerNumber}
              </Typography>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default MatchEvent;
