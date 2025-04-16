import React, { useState, useEffect } from "react";
import {
  Box, Container, Typography, Grid, TextField, InputAdornment, Select,
  MenuItem, FormControl, InputLabel
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import LeagueCard from "../components/leagueCard";

const LeaguesPage = () => {
  const [leagues, setLeagues] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [filteredLeagues, setFilteredLeagues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/tournaments");
        const data = await res.json();
        const enriched = data.map(league => {
          const now = new Date();
          const start = new Date(league.leagueStart);
          const end = new Date(league.leagueEnd);
        
          let status = "Upcoming";
          if (now >= start && now <= end) {
            status = "In Progress";
          } else if (now > end) {
            status = "Completed";
          }
        
          return {
            id: league.id,
            name: league.name,
            startDate: start.toISOString().split("T")[0],
            endDate: end.toISOString().split("T")[0],
            department: league.hostSchool,
            teams: league.maxTeams,
            gender: league.gender, 
            status,
            bannerUrl: league.logoUrl || `https://via.placeholder.com/400x180?text=${encodeURIComponent(league.name)}`
          };
        });
        
        setLeagues(enriched);
        setFilteredLeagues(enriched);
      } catch (err) {
        console.error("Failed to fetch leagues:", err);
      }
    };

    fetchLeagues();
  }, []);

  useEffect(() => {
    let filtered = leagues.filter((league) =>
      league.name.toLowerCase().includes(search.toLowerCase())
    );
    if (statusFilter !== "All") {
      filtered = filtered.filter((league) => league.status === statusFilter);
    }
    setFilteredLeagues(filtered);
  }, [search, statusFilter, leagues]);

  const handleViewDetails = (id) => {
    navigate(`/leagues/${id}`);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        All Leagues
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
          justifyContent: "space-between",
        }}
      >
        <TextField
          placeholder="Search leagues..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1, minWidth: 250 }}
        />

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Upcoming">Upcoming</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredLeagues.map((league) => (
          <Grid item xs={12} sm={6} md={4} key={league.id}>
            <LeagueCard league={league} onViewDetails={() => handleViewDetails(league.id)} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default LeaguesPage;
