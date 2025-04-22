import React, { useEffect, useState } from "react";
import {
  Paper, Typography, CircularProgress, Alert, Box,
  Table, TableHead, TableRow, TableCell, TableBody
} from "@mui/material";
import dayjs from "dayjs";

const MatchHistory = ({ teamId }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = sessionStorage.getItem("authToken");
      const res = await fetch(`http://localhost:8080/api/teams/${teamId}/matches`, {
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
  };

  useEffect(() => {
    fetchMatches();
  }, [teamId]);

  return (
    <Paper sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Match History
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" p={2}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : matches.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No matches found.
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Opponent</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches.map((match) => (
              <TableRow key={match.id}>
                <TableCell>{dayjs(match.matchDate).format("YYYY-MM-DD HH:mm")}</TableCell>
                <TableCell>{match.opponent}</TableCell>
                <TableCell>{match.teamScore} - {match.opponentScore}</TableCell>
                <TableCell>{match.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export default MatchHistory;
