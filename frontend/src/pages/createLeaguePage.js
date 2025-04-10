import React, { useState } from "react";
import axios from 'axios';
import {
  Box, Button, Container, Grid, MenuItem, TextField, Typography, InputLabel, Select, FormControl, Paper, Avatar, FormHelperText,
  Divider, Tooltip, Chip, FormControlLabel, Switch, IconButton
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CreateLeaguePage = () => {
  const [form, setForm] = useState({
    name: "",
    shortName: "",
    hostSchool: "",
    season: "",
    logo: null,
    signUpStart: null,
    signUpEnd: null,
    leagueStart: null,
    leagueEnd: null,
    maxTeams: 8,
    minTeams: 4,
    maxPlayersPerTeam: 18,
    minPlayersPerTeam: 5,
    format: "",
    gameDuration: 60,
    location: "",
    isPublic: true,
    requiresApproval: false,
    ruleAttachment: null,
    contactEmail: "",
    contactPhone: "",
    description: "",
    ageGroup: "",
    gender: "mixed",
    equipmentRequired: "",
    awards: "",
    cancellationPolicy: ""
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [additionalContacts, setAdditionalContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", email: "", role: "" });

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "League name is required";
    if (!form.hostSchool) newErrors.hostSchool = "Host school is required";
    if (!form.contactEmail) newErrors.contactEmail = "Contact email is required";
    if (form.signUpStart && form.signUpEnd && form.signUpStart > form.signUpEnd) {
      newErrors.signUpEnd = "Signup end must be after start";
    }
    if (form.leagueStart && form.leagueEnd && form.leagueStart > form.leagueEnd) {
      newErrors.leagueEnd = "League end must be after start";
    }
    if (form.maxTeams < form.minTeams) {
      newErrors.maxTeams = "Max teams must be greater than min teams";
    }
    if (form.maxPlayersPerTeam < form.minPlayersPerTeam) {
      newErrors.maxPlayersPerTeam = "Max players must be greater than min players";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    if (name === 'logo') {
      setLogoPreview(URL.createObjectURL(file));
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post("/api/upload", formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        const url = response.data?.url || "";
        setForm((prev) => ({ ...prev, logoUrl: url, logo: file }));
      } catch (error) {
        console.error("Upload failed", error);
      }
    } else if (name === 'ruleAttachment') {
      setForm((prev) => ({ ...prev, [name]: file }));
    }
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.email) {
      setAdditionalContacts([...additionalContacts, newContact]);
      setNewContact({ name: "", email: "", role: "" });
    }
  };

  const handleRemoveContact = (index) => {
    setAdditionalContacts(additionalContacts.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      for (const key in form) {
        if (form[key] !== null && key !== 'logo') {
          formData.append(key, form[key]);
        }
      }
      additionalContacts.forEach((contact, index) => {
        formData.append(`additionalContacts[${index}][name]`, contact.name);
        formData.append(`additionalContacts[${index}][email]`, contact.email);
        formData.append(`additionalContacts[${index}][role]`, contact.role);
      });
      console.log("League form data:", Object.fromEntries(formData));
      alert("League created successfully (mock)");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
        <Paper elevation={3} sx={{
          p: 4,
          borderRadius: 3,
          background: 'linear-gradient(to bottom, #f9f9f9, #ffffff)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
        }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 4,
            background: 'linear-gradient(to right, #3f51b5, #2196f3)',
            color: 'white',
            p: 2,
            borderRadius: 2
          }}>
            <SportsSoccerIcon sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
              Create New League
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  Basic Information
                  <Tooltip title="Required fields are marked with *">
                    <InfoIcon sx={{ ml: 1, fontSize: 18 }} />
                  </Tooltip>
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="League Name "
                  name="name"
                  fullWidth
                  required
                  value={form.name}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Short Name"
                  name="shortName"
                  fullWidth
                  value={form.shortName}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  helperText="For display in tight spaces"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Host School "
                  name="hostSchool"
                  fullWidth
                  required
                  value={form.hostSchool}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  error={!!errors.hostSchool}
                  helperText={errors.hostSchool}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Season"
                  name="season"
                  fullWidth
                  placeholder="e.g., 2024-2025 Spring"
                  value={form.season}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="League Description"
                  name="description"
                  fullWidth
                  multiline
                  rows={3}
                  value={form.description}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  helperText="Brief description that will be shown to participants"
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Avatar
                    src={logoPreview}
                    sx={{
                      width: 100,
                      height: 100,
                      bgcolor: 'grey.200',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }}
                    variant="rounded"
                  >
                    {!logoPreview && <SportsSoccerIcon fontSize="large" />}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      sx={{ mb: 1 }}
                    >
                      Upload League Logo
                      <input type="file" name="logo" hidden accept="image/*" onChange={handleFileChange} />
                    </Button>
                    <FormHelperText>Recommended size: 300x300px (JPG/PNG)</FormHelperText>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom sx={{
                  color: 'primary.main',
                  fontWeight: 600
                }}>
                  Schedule
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Signup Start"
                  value={form.signUpStart}
                  onChange={(date) => handleDateChange('signUpStart', date)}
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      size: 'small',
                      fullWidth: true,
                      error: !!errors.signUpStart
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Signup End"
                  value={form.signUpEnd}
                  onChange={(date) => handleDateChange('signUpEnd', date)}
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      size: 'small',
                      fullWidth: true,
                      error: !!errors.signUpEnd,
                      helperText: errors.signUpEnd
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="League Start"
                  value={form.leagueStart}
                  onChange={(date) => handleDateChange('leagueStart', date)}
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      size: 'small',
                      fullWidth: true,
                      error: !!errors.leagueStart
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="League End"
                  value={form.leagueEnd}
                  onChange={(date) => handleDateChange('leagueEnd', date)}
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      size: 'small',
                      fullWidth: true,
                      error: !!errors.leagueEnd,
                      helperText: errors.leagueEnd
                    }
                  }}
                />
              </Grid>

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
                    name="format"
                    value={form.format}
                    onChange={handleChange}
                  >
                    <MenuItem value="Round Robin">Round Robin</MenuItem>
                    <MenuItem value="League">League</MenuItem>
                    <MenuItem value="Single Elimination">Single Elimination</MenuItem>
                    <MenuItem value="Double Elimination">Double Elimination</MenuItem>
                    <MenuItem value="Group + Knockout">Group + Knockout</MenuItem>
                    <MenuItem value="League + Playoffs">League + Playoffs</MenuItem>
                    <MenuItem value="Swiss System">Swiss System</MenuItem>
                    <MenuItem value="Custom">Custom Format</MenuItem>
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
                    <MenuItem value="Adult">Adult</MenuItem>
                    <MenuItem value="Open">Open Age</MenuItem>
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
                    <MenuItem value="mixed">Mixed</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
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

              <Grid item xs={12} sx={{ mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6" gutterBottom sx={{
                    color: 'primary.main',
                    fontWeight: 600,
                    flexGrow: 1
                  }}>
                    League Settings
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={form.isPublic}
                        onChange={(e) => setForm({ ...form, isPublic: e.target.checked })}
                        color="primary"
                      />
                    }
                    label={form.isPublic ? "Public League" : "Private League"}
                    labelPlacement="start"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {form.isPublic ?
                    "Public leagues are visible to all users" :
                    "Private leagues require an invitation to join"}
                </Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={form.requiresApproval}
                      onChange={(e) => setForm({ ...form, requiresApproval: e.target.checked })}
                      color="primary"
                    />
                  }
                  label="Require team approval"
                  sx={{ display: 'block' }}
                />
                <Typography variant="body2" color="text.secondary">
                  {form.requiresApproval ?
                    "Teams must be approved by league organizers" :
                    "Teams can join without approval"}
                </Typography>
              </Grid>

              <Grid item xs={12} sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom sx={{
                  color: 'primary.main',
                  fontWeight: 600
                }}>
                  Contact Information
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Primary Contact Email "
                  name="contactEmail"
                  type="email"
                  fullWidth
                  required
                  value={form.contactEmail}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  error={!!errors.contactEmail}
                  helperText={errors.contactEmail}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Primary Contact Phone"
                  name="contactPhone"
                  type="tel"
                  fullWidth
                  value={form.contactPhone}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                  Additional Contacts
                </Typography>
                {additionalContacts.map((contact, index) => (
                  <Box key={index} sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 1,
                    p: 1,
                    backgroundColor: 'rgba(0,0,0,0.03)',
                    borderRadius: 1
                  }}>
                    <Chip label={contact.role || "No role"} size="small" />
                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                      {contact.name} ({contact.email})
                    </Typography>
                    <IconButton size="small" onClick={() => handleRemoveContact(index)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <TextField
                    label="Name"
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    size="small"
                  />
                  <TextField
                    label="Email"
                    type="email"
                    value={newContact.email}
                    onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                    size="small"
                  />
                  <TextField
                    label="Role"
                    value={newContact.role}
                    onChange={(e) => setNewContact({ ...newContact, role: e.target.value })}
                    size="small"
                    placeholder="e.g., Referee Coordinator"
                  />
                  <Button
                    variant="outlined"
                    onClick={handleAddContact}
                    disabled={!newContact.name || !newContact.email}
                  >
                    Add
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom sx={{
                  color: 'primary.main',
                  fontWeight: 600
                }}>
                  Rules & Documents
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Upload any documents that participants should review
                </Typography>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  Upload Rules Document
                  <input type="file" name="ruleAttachment" hidden accept=".pdf,.docx" onChange={handleFileChange} />
                </Button>
                <FormHelperText>PDF or Word document with league rules (max 10MB)</FormHelperText>
              </Grid>

              <Grid item xs={12} sx={{ mt: 4 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    background: 'linear-gradient(to right, #3f51b5, #2196f3)',
                    boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
                    '&:hover': {
                      boxShadow: '0 5px 8px rgba(0,0,0,0.3)'
                    }
                  }}
                >
                  Create League
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default CreateLeaguePage;