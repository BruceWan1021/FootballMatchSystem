import React, { useState } from "react";
import {
  TextField, Button, Box, Paper, Typography
} from "@mui/material";

const LeagueInfoEditor = ({ tournament, setTournament }) => {
  const [form, setForm] = useState({
    name: tournament.name,
    hostSchool: tournament.hostSchool,
    season: tournament.season,
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      const res = await fetch(`http://localhost:8080/api/tournaments/${tournament.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Failed to update tournament");

      const updated = await res.json();
      setTournament(updated);
      alert("Tournament updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Update failed: " + err.message);
    }
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h6" mb={2}>Edit Tournament Info</Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField name="name" label="Tournament Name" value={form.name} onChange={handleChange} />
        <TextField name="hostSchool" label="Host School" value={form.hostSchool} onChange={handleChange} />
        <TextField name="season" label="Season" value={form.season} onChange={handleChange} />
        <Button variant="contained" onClick={handleSave}>Save Changes</Button>
      </Box>
    </Paper>
  );
};

export default LeagueInfoEditor;
