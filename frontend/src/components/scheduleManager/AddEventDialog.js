import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, InputLabel, FormControl,
  Grid, Box, Typography, Divider, Avatar, styled
} from "@mui/material";
import {
  Save as SaveIcon,
  Close as CloseIcon,
  SportsSoccer as SoccerIcon,
  People as PeopleIcon,
  AccessTime as TimeIcon,
  Description as DescriptionIcon,
  SwapHoriz as SubstitutionIcon
} from "@mui/icons-material";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.spacing(2),
    minWidth: '500px'
  }
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: theme.spacing(2, 0, 1),
  color: theme.palette.text.secondary,
  '& svg': {
    marginRight: theme.spacing(1)
  }
}));

const TeamAvatar = styled(Avatar)(({ theme }) => ({
  width: 24,
  height: 24,
  marginRight: theme.spacing(1),
  backgroundColor: theme.palette.primary.main
}));

const AddEventDialog = ({ open, match, onClose, onAddEvent }) => {
  const [formData, setFormData] = useState({
    eventType: '',
    eventTime: '',
    description: '',
    playerNumber: '',
    teamId: '',
    assistPlayerNumber: '',
    substitutePlayerNumber: ''
  });

  useEffect(() => {
    if (match) {
      setFormData({
        eventType: '',
        eventTime: '',
        description: '',
        playerNumber: '',
        teamId: match.team1?.id || '',
        assistPlayerNumber: '',
        substitutePlayerNumber: ''
      });
    }
  }, [match]);

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSaveEvent = async () => {
    const { eventType, eventTime, playerNumber, teamId, assistPlayerNumber, substitutePlayerNumber } = formData;
    const token = sessionStorage.getItem("authToken");

    if (!eventType || !eventTime || !playerNumber || !teamId) {
      alert("Please fill in all required fields (marked with *)");
      return;
    }

    const eventData = {
      eventType,
      eventTime,
      playerNumber,
      teamId,
      assistPlayerNumber: assistPlayerNumber,
      substitutePlayerNumber: substitutePlayerNumber,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/matches/${match.id}/events`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add event");
      }

      onAddEvent(result);
      onClose();
    } catch (error) {
      console.error("Error saving event:", error);
      alert(`Error: ${error.message}`);
    }
  };

  if (!match) return null;

  const teams = [match.team1, match.team2].filter(Boolean);
  const isSubstitution = formData.eventType === "SUBSTITUTION";
  const isGoalOrAssist = ["GOAL", "ASSIST"].includes(formData.eventType);

  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <SoccerIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6">
            Add Match Event: {match.team1?.name} vs {match.team2?.name}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <SectionHeader variant="subtitle1">
          <DescriptionIcon /> Event Details
        </SectionHeader>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Event Type</InputLabel>
              <Select
                label="Event Type"
                value={formData.eventType}
                onChange={handleChange('eventType')}
              >
                <MenuItem value="GOAL">Goal</MenuItem>
                <MenuItem value="YELLOW_CARD">Yellow Card</MenuItem>
                <MenuItem value="RED_CARD">Red Card</MenuItem>
                <MenuItem value="SUBSTITUTION">Substitution</MenuItem>
                <MenuItem value="PENALTY">Penalty</MenuItem>
                <MenuItem value="EXTRA_TIME">Extra Time</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Event Time (minutes)"
              fullWidth
              margin="normal"
              type="number"
              InputProps={{ inputProps: { min: 1, max: 120 } }}
              value={formData.eventTime}
              onChange={handleChange('eventTime')}
              required
            />
          </Grid>
        </Grid>

        <SectionHeader variant="subtitle1">
          <PeopleIcon /> Team & Player
        </SectionHeader>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Team</InputLabel>
              <Select
                label="Team"
                value={formData.teamId}
                onChange={handleChange('teamId')}
              >
                {teams.map((team) => (
                  <MenuItem key={team.id} value={team.id}>
                    <Box display="flex" alignItems="center">
                      <TeamAvatar src={team.logo} alt={team.name}>
                        {team.name.charAt(0)}
                      </TeamAvatar>
                      {team.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label={isSubstitution ? "Player Out Number" : "Player Number"}
              fullWidth
              margin="normal"
              value={formData.playerNumber}
              onChange={handleChange('playerNumber')}
              required
            />
          </Grid>
        </Grid>

        {isGoalOrAssist && (
          <>
            <SectionHeader variant="subtitle1">
              <SoccerIcon /> Assist Information
            </SectionHeader>
            <TextField
              label="Assist Player Number"
              fullWidth
              margin="normal"
              value={formData.assistPlayerNumber}
              onChange={handleChange('assistPlayerNumber')}
            />
          </>
        )}

        {isSubstitution && (
          <>
            <SectionHeader variant="subtitle1">
              <SubstitutionIcon /> Substitution Details
            </SectionHeader>
            <TextField
              label="Player In Number *"
              fullWidth
              margin="normal"
              value={formData.substitutePlayerNumber}
              onChange={handleChange('substitutePlayerNumber')}
              required
            />
          </>
        )}

        <SectionHeader variant="subtitle1">
          <DescriptionIcon /> Additional Information
        </SectionHeader>
        <TextField
          label="Event Description"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          value={formData.description}
          onChange={handleChange('description')}
          placeholder="Enter any additional details about the event..."
        />
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          startIcon={<CloseIcon />}
          variant="outlined"
          sx={{ mr: 1 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSaveEvent}
          startIcon={<SaveIcon />}
          variant="contained"
          color="primary"
        >
          Save Event
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default AddEventDialog;
