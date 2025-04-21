import React from "react";
import { Grid, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const ScheduleSection = ({ form, errors, handleDateChange }) => {
  return (
    <>
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
          value={form.signupStart}
          onChange={(date) => handleDateChange('signupStart', date)}
          slotProps={{
            textField: {
              variant: 'outlined',
              size: 'small',
              fullWidth: true,
              error: !!errors.signupStart
            }
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <DatePicker
          label="Signup End"
          value={form.signupEnd}
          onChange={(date) => handleDateChange('signupEnd', date)}
          slotProps={{
            textField: {
              variant: 'outlined',
              size: 'small',
              fullWidth: true,
              error: !!errors.signupEnd,
              helperText: errors.signupEnd
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
    </>
  );
};

export default ScheduleSection;