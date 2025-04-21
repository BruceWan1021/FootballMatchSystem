import React from "react";
import { 
  Grid, TextField, Typography, Tooltip, 
  Box, Avatar, FormHelperText, Button 
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import InfoIcon from '@mui/icons-material/Info';

const BasicInfoSection = ({ form, errors, handleChange, logoPreview, handleFileChange }) => {
  return (
    <>
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
    </>
  );
};

export default BasicInfoSection;