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
  Stack
} from "@mui/material";
import {
  SportsSoccer as SoccerIcon,
  CalendarToday as DateIcon,
  Schedule as TimeIcon,
  LocationOn as LocationIcon,
  EmojiEvents as TournamentIcon,
  CheckCircle as CompletedIcon,
  Pending as PendingIcon
} from "@mui/icons-material";

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
    <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
      <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
        <List sx={{ py: 0 }}>
          {matches.map((match) => (
            <React.Fragment key={match.id}>
              <ListItem
                sx={{
                  py: 2,
                  "&:hover": { backgroundColor: theme.palette.action.hover }
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      width: 40,
                      height: 40
                    }}
                  >
                    <SoccerIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {match.teamA}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        vs
                      </Typography>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {match.teamB}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Stack direction="row" spacing={2} mt={1}>
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
                  }
                  sx={{ my: 0 }}
                />
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Chip
                    icon={
                      match.status === "Completed" ? (
                        <CompletedIcon fontSize="small" />
                      ) : (
                        <PendingIcon fontSize="small" />
                      )
                    }
                    label={match.status}
                    color={
                      match.status === "Completed" ? "success" : "default"
                    }
                    size="small"
                    sx={{ ml: 1 }}
                  />
                  {match.score && (
                    <Typography variant="h6" fontWeight="bold">
                      {match.score}
                    </Typography>
                  )}
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      minWidth: 90,
                      textTransform: "none",
                      boxShadow: "none"
                    }}
                  >
                    Details
                  </Button>
                </Box>
              </ListItem>
              <Divider variant="middle" />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default MatchList;
