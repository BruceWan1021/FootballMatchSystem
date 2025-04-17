import React, { useState, useEffect } from "react";
import {
  Box, Container, Typography, Grid, TextField, InputAdornment, Select,
  MenuItem, FormControl, InputLabel
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import TeamCard from "../components/teamCard";

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [filteredTeams, setFilteredTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/teams");
        const data = await res.json();

        const enriched = data.map((team) => ({
          id: team.id,
          name: team.name,
          school: team.school || "Unknown",
          logoUrl: team.logoUrl || `https://via.placeholder.com/400x180?text=${encodeURIComponent(team.name)}`,
          tournamentName: team.tournament?.name || null,
        }));

        setTeams(enriched);
        setFilteredTeams(enriched);
      } catch (err) {
        console.error("Failed to fetch teams:", err);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    let filtered = teams.filter((team) =>
      team.name.toLowerCase().includes(search.toLowerCase())
    );
    if (locationFilter !== "All") {
      filtered = filtered.filter((team) => team.location === locationFilter);
    }
    setFilteredTeams(filtered);
  }, [search, locationFilter, teams]);

  const handleViewDetails = (id) => {
    navigate(`/teams/${id}`);
  };

  const uniqueLocations = ["All", ...new Set(teams.map((team) => team.location).filter(Boolean))];

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        All Teams
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
          placeholder="Search teams..."
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
          <InputLabel>Location</InputLabel>
          <Select
            value={locationFilter}
            label="Location"
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            {uniqueLocations.map((loc) => (
              <MenuItem key={loc} value={loc}>
                {loc}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredTeams.map((team) => (
          <Grid item xs={12} sm={6} md={4} key={team.id}>
            <TeamCard team={team} onViewDetails={() => handleViewDetails(team.id)} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TeamsPage;
