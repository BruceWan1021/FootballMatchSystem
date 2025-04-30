import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Divider,
  Chip,
  Tooltip,
  useTheme
} from "@mui/material";
import { SportsSoccer, Event } from "@mui/icons-material";
import dayjs from "dayjs";

const MatchList = ({ matches }) => {
  const theme = useTheme();

  if (!matches || matches.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        No matches found.
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        My Matches
      </Typography>
      <Grid container spacing={2}>
        {matches.map((match) => (
          <Grid item xs={12} sm={6}  key={match.id}>
            <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
              {/* 上方球队信息 */}
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                {/* 队伍1 */}
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar src={match.team1?.logoUrl} />
                  <Typography fontWeight="bold">{match.team1?.name}</Typography>
                </Box>

                <Chip
                  label={
                    match.status === "COMPLETED"
                      ? `${match.score1}-${match.score2}`
                      : "vs"
                  }
                  color="primary"
                  variant="outlined"
                />

                {/* 队伍2 */}
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography fontWeight="bold">{match.team2?.name}</Typography>
                  <Avatar src={match.team2?.logoUrl} />
                </Box>
              </Box>

              <Divider sx={{ my: 1 }} />

              {/* 详细信息 */}
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Event fontSize="small" color="action" />
                <Typography variant="body2">
                  {dayjs(match.matchDate).format("YYYY-MM-DD HH:mm")}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <SportsSoccer fontSize="small" color="action" />
                <Typography variant="body2">{match.stadium}</Typography>
              </Box>

              {match.tournament && (
                <Box mt={1}>
                  <Tooltip title="Tournament">
                    <Chip
                      label={match.tournament.name}
                      size="small"
                      variant="outlined"
                      color="secondary"
                    />
                  </Tooltip>
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MatchList;
