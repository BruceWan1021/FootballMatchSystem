import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
  InputLabel,
  Select,
  FormControl,
  Paper,
  Avatar,
  FormHelperText,
  Divider
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

const CreateLeaguePage = () => {
  const [form, setForm] = useState({
    name: "",
    shortName: "",
    hostSchool: "",
    season: "",
    logo: null,
    signUpStart: "",
    signUpEnd: "",
    leagueStart: "",
    leagueEnd: "",
    maxTeams: 8,
    maxPlayersPerTeam: 18,
    format: "",
    location: "",
    fee: 0,
    isPublic: true,
    ruleAttachment: null,
  });

  const [logoPreview, setLogoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'logo' && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
    setForm((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("League form data:", form);
    alert("League created successfully (mock)");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <SportsSoccerIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            Create New League
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 4 }} />

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* League Info Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Basic Information
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="League Name *"
                name="name"
                fullWidth
                required
                value={form.name}
                onChange={handleChange}
                variant="outlined"
                size="small"
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
              <FormControl fullWidth size="small">
                <InputLabel>Hosting School *</InputLabel>
                <Select
                  name="hostSchool"
                  value={form.hostSchool}
                  onChange={handleChange}
                  label="Hosting School *"
                  required
                >
                  <MenuItem value="School of Software">School of Software</MenuItem>
                  <MenuItem value="School of Computer Science">School of Computer Science</MenuItem>
                  <MenuItem value="School of Electronics">School of Electronics</MenuItem>
                </Select>
              </FormControl>
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

            {/* Logo Upload */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar 
                  src={logoPreview} 
                  sx={{ width: 80, height: 80, bgcolor: 'grey.200' }}
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
                    <input
                      type="file"
                      name="logo"
                      hidden
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </Button>
                  <FormHelperText>Recommended size: 300x300px</FormHelperText>
                </Box>
              </Box>
            </Grid>

            {/* Dates Section */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Schedule
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Signup Start"
                name="signUpStart"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={form.signUpStart}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Signup End"
                name="signUpEnd"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={form.signUpEnd}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="League Start"
                name="leagueStart"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={form.leagueStart}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="League End"
                name="leagueEnd"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={form.leagueEnd}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>

            {/* League Details Section */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                League Details
              </Typography>
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
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Match Format *"
                name="format"
                fullWidth
                required
                placeholder="e.g., Group + Knockout"
                value={form.format}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Match Location *"
                name="location"
                fullWidth
                required
                value={form.location}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item xs={6} sm={3}>
              <TextField
                label="Signup Fee"
                name="fee"
                type="number"
                fullWidth
                value={form.fee}
                onChange={handleChange}
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                }}
                inputProps={{ min: 0 }}
              />
            </Grid>

            <Grid item xs={6} sm={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Visibility</InputLabel>
                <Select
                  name="isPublic"
                  value={form.isPublic}
                  onChange={(e) => setForm((prev) => ({ ...prev, isPublic: e.target.value === 'true' }))}
                  label="Visibility"
                >
                  <MenuItem value={true}>Public</MenuItem>
                  <MenuItem value={false}>Private</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Rules Section */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Rules & Documents
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                fullWidth
                sx={{ py: 1.5 }}
              >
                Upload Rules Document
                <input
                  type="file"
                  name="ruleAttachment"
                  hidden
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                />
              </Button>
              <FormHelperText>PDF or Word document with league rules</FormHelperText>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{ py: 1.5, fontWeight: 600 }}
              >
                Create League
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateLeaguePage;