import React from "react";
import { Grid, Typography, FormControlLabel, Switch, Box } from "@mui/material";

const SettingsSection = ({ form, handleChange }) => {
  return (
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
              onChange={(e) => handleChange({
                target: {
                  name: 'isPublic',
                  value: e.target.checked
                }
              })}
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
            onChange={(e) => handleChange({
              target: {
                name: 'requiresApproval',
                value: e.target.checked
              }
            })}
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
  );
};

export default SettingsSection;