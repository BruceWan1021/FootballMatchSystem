import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, Paper, TextField, Select, MenuItem, InputLabel, FormControl, Chip, CircularProgress, } from "@mui/material";
import { Link } from "react-router-dom";


const statusColor = {
  UPCOMING: "info",
  LIVE: "warning",
  COMPLETED: "success",
};

const MatchesPage = () => {
  const [matches, setMatches] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/matches/all")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((match) => {
          const rawStatus = match.status?.toUpperCase() || "SCHEDULED";
          let convertedStatus = rawStatus;
          if (rawStatus === "SCHEDULED") convertedStatus = "UPCOMING";
          if (rawStatus === "IN_PROGRESS") convertedStatus = "LIVE";

          return {
            id: match.id,
            title: match.tournament?.name || "Unknown Tournament",
            teamA: match.team1?.name || "Team A",
            teamB: match.team2?.name || "Team B",
            date: match.matchDate?.split("T")[0] || "-",
            time: match.matchDate?.split("T")[1]?.slice(0, 5) || "-",
            status: convertedStatus,
            score: match.status === "COMPLETED"|| "IN_PROGRESS" ? `${match.score1} - ${match.score2}` : "-",
          };          
        });
        setMatches(formatted);
        setFiltered(formatted);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let temp = [...matches];
    if (statusFilter !== "ALL") {
      temp = temp.filter((m) => m.status === statusFilter);
    }
    if (search) {
      temp = temp.filter(
        (m) =>
          m.teamA.toLowerCase().includes(search.toLowerCase()) ||
          m.teamB.toLowerCase().includes(search.toLowerCase()) ||
          m.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(temp);
  }, [search, statusFilter, matches]);

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Matches
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Search by team or league"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="ALL">All</MenuItem>
              <MenuItem value="UPCOMING">Upcoming</MenuItem>
              <MenuItem value="LIVE">Live</MenuItem>
              <MenuItem value="COMPLETED">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : filtered.length === 0 ? (
        <Typography>No matches found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {filtered.map((match) => (
            <Grid item xs={12} sm={6} md={4} key={match.id}>
              <Link
                to={`/matches/${match.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Paper elevation={3} sx={{ p: 2, borderRadius: 2, cursor: "pointer", '&:hover': { boxShadow: 6 } }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {match.title}
                    </Typography>
                    <Chip
                      size="small"
                      label={match.status}
                      color={statusColor[match.status] || "default"}
                    />
                  </Box>
                  <Typography variant="body1" fontWeight="bold">
                    {match.teamA} vs {match.teamB}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    📅 {match.date} ⏰ {match.time}
                  </Typography>
                  {match.status === "COMPLETED" && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Final Score: <strong>{match.score}</strong>
                    </Typography>
                  )}
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MatchesPage;