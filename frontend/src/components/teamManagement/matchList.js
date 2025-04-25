import React, { useEffect, useState, useCallback } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Avatar,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import dayjs from "dayjs";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EventIcon from "@mui/icons-material/Event";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CancelIcon from "@mui/icons-material/Cancel";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TournamentIcon from "@mui/icons-material/EmojiEvents";
import LineupEditor from "./lineupEditor";

const MatchHistory = ({ teamId }) => {
  const theme = useTheme();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openLineupDialog, setOpenLineupDialog] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const fetchMatches = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = sessionStorage.getItem("authToken");
      const res = await fetch(`http://localhost:8080/api/matches/teams/${teamId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error("Failed to fetch match history");
      const data = await res.json();
      setMatches(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [teamId]);

  useEffect(() => {
    if (teamId) {
      fetchMatches();
    }
  }, [teamId, fetchMatches]);

  const isWithinTwoHours = (matchDate) => {
    const now = dayjs();
    const matchTime = dayjs(matchDate);
    return matchTime.diff(now, 'hour') <= 2 && matchTime.isAfter(now);
  };

  const handleOpenLineupDialog = (match) => {
    setSelectedMatch(match);
    setOpenLineupDialog(true);
  };

  const handleCloseLineupDialog = () => {
    setOpenLineupDialog(false);
    setSelectedMatch(null);
  };

  const getStatusChip = (status, isWinner, matchDate, match) => {
    if (status === "SCHEDULED" && isWithinTwoHours(matchDate)) {
      return (
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<SportsSoccerIcon />}
          sx={{ ml: 1 }}
          onClick={() => handleOpenLineupDialog(match)}
        >
          Upload Lineup
        </Button>
      );
    }

    const statusMap = {
      COMPLETED: {
        label: isWinner ? "Won" : "Lost",
        color: isWinner ? "success" : "error",
        icon: <EmojiEventsIcon fontSize="small" />
      },
      SCHEDULED: {
        label: "Upcoming",
        color: "info",
        icon: <ScheduleIcon fontSize="small" />
      },
      CANCELLED: {
        label: "Cancelled",
        color: "warning",
        icon: <CancelIcon fontSize="small" />
      },
      DEFAULT: {
        label: status,
        color: "default",
        icon: <SportsSoccerIcon fontSize="small" />
      }
    };

    const statusConfig = statusMap[status] || statusMap.DEFAULT;
    return (
      <Chip
        label={statusConfig.label}
        color={statusConfig.color}
        icon={statusConfig.icon}
        size="small"
        variant="outlined"
        sx={{ ml: 1 }}
      />
    );
  };

  const getScoreDisplay = (match) => {
    if (match.status === "CANCELLED") {
      return "Cancelled";
    }
    if (match.status === "SCHEDULED" && dayjs(match.matchDate).isAfter(dayjs())) {
      return "vs";
    }
    return `${match.score1} - ${match.score2}`;
  };

  const isTeam1Winner = (match) => {
    return match.score1 > match.score2;
  };

  const getMatchResultStyle = (match) => {
    if (match.status !== "COMPLETED") return {};

    return {
      backgroundColor: isTeam1Winner(match)
        ? theme.palette.success.light + "33"
        : theme.palette.error.light + "33",
      fontWeight: "bold"
    };
  };

  return (
    <>
      <Paper
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: theme.shadows[3],
          backgroundColor: theme.palette.background.paper
        }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress size={60} thickness={4} />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        ) : matches.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={4}
          >
            <EventIcon color="disabled" sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              No matches recorded yet
            </Typography>
          </Box>
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="match history table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Date & Time</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Matchup</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>Score</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Tournament</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {matches.map((match) => (
                <TableRow
                  key={match.id}
                  hover
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    ...getMatchResultStyle(match)
                  }}
                >
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <EventIcon color="action" sx={{ mr: 1 }} />
                      {dayjs(match.matchDate).format("MMM D, YYYY h:mm A")}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        sx={{
                          width: 24,
                          height: 24,
                          mr: 1,
                          bgcolor: theme.palette.secondary.main
                        }}
                      >
                        <SportsSoccerIcon sx={{ fontSize: 14 }} />
                      </Avatar>
                      {`${match.team1.name} vs ${match.team2.name}`}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <LocationOnIcon color="action" sx={{ mr: 1 }} />
                      {match.stadium || "TBD"}
                    </Box>
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {getScoreDisplay(match)}
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <TournamentIcon color="action" sx={{ mr: 1 }} />
                      {match.tournament?.name || "N/A"}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {getStatusChip(match.status, isTeam1Winner(match), match.matchDate, match)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>

      {/* Lineup Editor Dialog */}
      <Dialog
        open={openLineupDialog}
        onClose={handleCloseLineupDialog}
        maxWidth="lg"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            height: "90vh",
            maxHeight: "none",
            width: "90vw",
            maxWidth: "none"
          }
        }}
      >
        <DialogTitle sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          fontSize: "1.5rem",
          fontWeight: "bold",
          py: 2
        }}>
          <Box display="flex" alignItems="center">
            <SportsSoccerIcon sx={{ mr: 2 }} />
            Lineup Editor - {selectedMatch?.team1.name} vs {selectedMatch?.team2.name}
          </Box>
        </DialogTitle>
        <DialogContent dividers sx={{
          padding: 0,
          display: "flex",
          flexDirection: "column",
          height: "calc(100% - 64px)"
        }}>
          {selectedMatch && (
            <Box sx={{
              flex: 1,
              overflow: "auto",
              p: 3
            }}>
              <LineupEditor
                teamId={teamId}  
                matchId={selectedMatch.id} 
                onSaveSuccess={() => {
                  handleCloseLineupDialog();
                  alert('阵容已更新！');
                }}
              />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MatchHistory;