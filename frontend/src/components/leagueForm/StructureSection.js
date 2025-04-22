import React from "react";
import {
  Grid, Typography, TextField, FormControl,
  InputLabel, Select, MenuItem, Checkbox, ListItemText, FormHelperText
} from "@mui/material";

const EQUIPMENT_OPTIONS = [
  "Jersey",
  "Shorts",
  "Socks",
  "Shin Guards",
  "Cleats",
  "Gloves",
  "Base Layer",
  "Captain Armband",
  "Match Ball",
  "Alternative Jerseys/Bibs",
  "Printed Roster",
  "Medical Kit",
  "Team Flag"
];

const AWARD_OPTIONS = [
  "Champion",
  "Runner-up",
  "Third Place",
  "Most Valuable Player",
  "Top Scorer",
  "Best Goalkeeper",
  "Fair Play Award",
  "Best Organized Team",
  "Best Newcomer",
  "Most Promising Team",
  "Assist Leader",
  "Most Popular Player"
];

const StructureSection = ({ form, errors, handleChange }) => {
  return (
    <>
      <Grid item xs={12} sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom sx={{
          color: 'primary.main',
          fontWeight: 600
        }}>
          League Structure
        </Typography>
      </Grid>

      <Grid item xs={6} sm={3}>
        <TextField
          label="Min Teams"
          name="minTeams"
          type="number"
          fullWidth
          value={form.minTeams}
          onChange={handleChange}
          variant="outlined"
          size="small"
          inputProps={{ min: 2 }}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          label="Max Teams"
          name="maxTeams"
          type="number"
          fullWidth
          value={form.maxTeams}
          onChange={handleChange}
          variant="outlined"
          size="small"
          inputProps={{ min: 2 }}
          error={!!errors.maxTeams}
          helperText={errors.maxTeams}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          label="Min Players/Team"
          name="minPlayersPerTeam"
          type="number"
          fullWidth
          value={form.minPlayersPerTeam}
          onChange={handleChange}
          variant="outlined"
          size="small"
          inputProps={{ min: 1 }}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          label="Max Players/Team"
          name="maxPlayersPerTeam"
          type="number"
          fullWidth
          value={form.maxPlayersPerTeam}
          onChange={handleChange}
          variant="outlined"
          size="small"
          inputProps={{ min: 1 }}
          error={!!errors.maxPlayersPerTeam}
          helperText={errors.maxPlayersPerTeam}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small" required>
          <InputLabel>Match Format </InputLabel>
          <Select
            label="Match Format "
            name="matchFormat"
            value={form.matchFormat}
            onChange={handleChange}
          >
            <MenuItem value="SINGLE_ROUND_ROBIN">Single Round Robin</MenuItem>
            <MenuItem value="DOUBLE_ROUND_ROBIN">Double Round Robin</MenuItem>
            <MenuItem value="SINGLE_ELIMINATION">Single Elimination</MenuItem>
            <MenuItem value="GROUP_KNOCKOUT">Group + Knockout</MenuItem>
            <MenuItem value="LEAGUE_PLAYOFFS">League + Playoffs</MenuItem>
            <MenuItem value="SWISS_SYSTEM">Swiss System</MenuItem>
            <MenuItem value="CUSTOM">Custom</MenuItem>
          </Select>
          <FormHelperText>Select the tournament structure</FormHelperText>
        </FormControl>
      </Grid>
      {form.format === 'Custom' && (
        <Grid item xs={12}>
          <TextField
            label="Custom Format Description"
            name="customFormat"
            fullWidth
            value={form.customFormat || ''}
            onChange={handleChange}
            variant="outlined"
            size="small"
            helperText="Describe your custom tournament format"
          />
        </Grid>
      )}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Game Duration (minutes)"
          name="gameDuration"
          type="number"
          fullWidth
          value={form.gameDuration}
          onChange={handleChange}
          variant="outlined"
          size="small"
          inputProps={{ min: 10 }}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Match Location "
          name="location"
          fullWidth
          required
          value={form.location}
          onChange={handleChange}
          variant="outlined"
          size="small"
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormControl fullWidth size="small">
          <InputLabel>Age Group</InputLabel>
          <Select
            name="ageGroup"
            value={form.ageGroup}
            onChange={handleChange}
            label="Age Group"
          >
            <MenuItem value="U12">Under 12</MenuItem>
            <MenuItem value="U14">Under 14</MenuItem>
            <MenuItem value="U16">Under 16</MenuItem>
            <MenuItem value="U18">Under 18</MenuItem>
            <MenuItem value="ADULT">Adult</MenuItem>
            <MenuItem value="OPEN">Open Age</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormControl fullWidth size="small">
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            label="Gender"
          >
            <MenuItem value="MIXED">Mixed</MenuItem>
            <MenuItem value="MALE">Male</MenuItem>
            <MenuItem value="FEMALE">Female</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Equipment Required</InputLabel>
          <Select
            multiple
            name="equipmentRequired"
            value={form.equipmentRequired}
            onChange={handleChange}
            renderValue={(selected) => selected.join(', ')}
          >
            {EQUIPMENT_OPTIONS.map((item) => (
              <MenuItem key={item} value={item}>
                <Checkbox checked={form.equipmentRequired.includes(item)} />
                <ListItemText primary={item} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Awards</InputLabel>
          <Select
            multiple
            name="awards"
            value={form.awards}
            onChange={handleChange}
            renderValue={(selected) => selected.join(', ')}
          >
            {AWARD_OPTIONS.map((award) => (
              <MenuItem key={award} value={award}>
                <Checkbox checked={form.awards.includes(award)} />
                <ListItemText primary={award} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Cancellation Policy"
          name="cancellationPolicy"
          fullWidth
          multiline
          rows={2}
          value={form.cancellationPolicy}
          onChange={handleChange}
          variant="outlined"
          size="small"
          helperText="Describe your policy for game cancellations"
        />
      </Grid>
    </>
  );
};

export default StructureSection;