import React, { useState, useEffect } from "react";
import {
  Box, Container, Typography, Grid, TextField, InputAdornment, Select,
  MenuItem, FormControl, InputLabel
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import LeagueCard from "../components/leagueCard";

const mockLeagues = [
  {
    id: 1,
    name: "2025 Spring Football League",
    startDate: "2025-03-15",
    endDate: "2025-06-01",
    department: "Computer Science",
    teams: 8,
    status: "Upcoming",
    bannerUrl: "https://via.placeholder.com/400x180?text=Spring+Football+League"
  },
  {
    id: 2,
    name: "2024 Autumn Championship",
    startDate: "2024-09-10",
    endDate: "2024-11-25",
    department: "Information Engineering",
    teams: 10,
    status: "Completed",
    bannerUrl: "https://via.placeholder.com/400x180?text=Autumn+Championship"
  },
  {
    id: 3,
    name: "2025 Summer Mini League",
    startDate: "2025-07-01",
    endDate: "2025-08-15",
    department: "Sports Committee",
    teams: 6,
    status: "In Progress",
    bannerUrl: "https://via.placeholder.com/400x180?text=Summer+Mini+League"
  },
];

const LeaguesPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [filteredLeagues, setFilteredLeagues] = useState(mockLeagues);
  const navigate = useNavigate();

  useEffect(() => {
    let filtered = mockLeagues.filter((league) =>
      league.name.toLowerCase().includes(search.toLowerCase())
    );
    if (statusFilter !== "All") {
      filtered = filtered.filter((league) => league.status === statusFilter);
    }
    setFilteredLeagues(filtered);
  }, [search, statusFilter]);

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