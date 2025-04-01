import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Button,
  Chip,
  Box,
  Typography,
  Paper,
  useTheme,
  Stack,
  Badge
} from "@mui/material";
import {
  SportsSoccer as SoccerIcon,
  CalendarToday as DateIcon,
  Schedule as TimeIcon,
  LocationOn as LocationIcon,
  EmojiEvents as TournamentIcon,
  CheckCircle as CompletedIcon,
  Pending as PendingIcon,
  Whatshot as LiveIcon,
  AccessTime as ScheduledIcon
} from "@mui/icons-material";

const getStatusConfig = (status) => {
  const normalized = (status || "").toLowerCase();
  const configs = {
    completed: {
      icon: <CompletedIcon fontSize="small" />, color: "success", label: "Completed"
    },
    inprogress: {
      icon: <LiveIcon fontSize="small" />, color: "warning", label: "In_Progress"
    },
    scheduled: {
      icon: <ScheduledIcon fontSize="small" />, color: "info", label: "Scheduled"
    }
  };
  return configs[normalized] || configs.scheduled;
};

const MatchList = ({ matches }) => {
  const theme = useTheme();

  if (!matches || matches.length === 0) {
    return (
      <Paper elevation={0} sx={{ p: 3, textAlign: "center" }}>
        <Typography color="text.secondary" variant="body1">
          No matches scheduled
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
      <Box sx={{ maxHeight: 480, overflowY: "auto" }}>
        <List sx={{ py: 0 }}>
          {matches.map((match) => {
            const statusConfig = getStatusConfig(match.status);

            return (
              <React.Fragment key={match.id}>
                <ListItem
                  sx={{
                    py: 2.5,
                    px: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    "&:hover": { backgroundColor: theme.palette.action.hover }
                  }}
                >
                  {/* 左侧队伍信息 */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: 140 }}>
                    <Avatar src={match.teamALogo} alt={match.teamA} />
                    <Typography variant="subtitle1" fontWeight="bold">
                      {match.teamA}
                    </Typography>
                  </Box>

                  <Typography variant="body1" color="text.secondary">
                    vs
                  </Typography>

                  {/* 右侧队伍信息 */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: 140 }}>
                    <Avatar src={match.teamBLogo} alt={match.teamB} />
                    <Typography variant="subtitle1" fontWeight="bold">
                      {match.teamB}
                    </Typography>
                  </Box>

                  {/* 比赛信息 */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing={1}>
                      <Chip
                        icon={<DateIcon fontSize="small" />}
                        label={match.date}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        icon={<TimeIcon fontSize="small" />}
                        label={match.time || "TBD"}
                        size="small"
                        variant="outlined"
                      />
                      {match.location && (
                        <Chip
                          icon={<LocationIcon fontSize="small" />}
                          label={match.location}
                          size="small"
                          variant="outlined"
                        />
                      )}
                      {match.tournament && (
                        <Chip
                          icon={<TournamentIcon fontSize="small" />}
                          label={match.tournament}
                          size="small"
                          variant="outlined"
                          color="secondary"
                        />
                      )}
                    </Stack>
                  </Box>

                  {/* 状态和操作 */}
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Chip
                      icon={statusConfig.icon}
                      label={statusConfig.label}
                      color={statusConfig.color}
                      size="small"
                      sx={{ fontWeight: "bold" }}
                    />
                    {match.score && (
                      <Typography variant="h6" fontWeight="bold">
                        {match.score}
                      </Typography>
                    )}
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ minWidth: 90, textTransform: "none", boxShadow: "none" }}
                    >
                      Details
                    </Button>
                  </Stack>
                </ListItem>
                <Divider variant="middle" />
              </React.Fragment>
            );
          })}
        </List>
      </Box>
    </Paper>
  );
};

export default MatchList;