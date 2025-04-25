import React, { useEffect, useState } from "react";
import {
  Typography, Paper, List, ListItem, ListItemText,
  Button, Divider, Box, CircularProgress, TextField,
  Grid, Avatar, ListItemAvatar, Chip, Tooltip, 
  Dialog, DialogTitle, DialogContent, DialogActions,
  MenuItem, Select, FormControl, InputLabel
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  SportsSoccer as MatchIcon,
  CalendarToday as DateIcon,
  LocationOn as StadiumIcon,
  EmojiEvents as TournamentIcon,
  Timeline as RoundIcon,
  CheckCircle as StatusIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon
} from "@mui/icons-material";
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
}));

const MatchListItem = styled(ListItem)(({ theme }) => ({
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  borderRadius: '8px',
  marginBottom: theme.spacing(1)
}));

const TeamAvatar = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  marginRight: theme.spacing(1),
  backgroundColor: theme.palette.primary.main
}));

const ScoreChip = styled(Chip)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.grey[200],
  marginLeft: theme.spacing(1)
}));

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const statusOptions = [
  { value: 'SCHEDULED', label: 'Scheduled' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'POSTPONED', label: 'Postponed' },
  { value: 'CANCELED', label: 'Canceled' }
];

const ScheduleManager = ({ tournamentId }) => {
  const [tournament, setTournament] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [customIntervalDays, setCustomIntervalDays] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [editingMatch, setEditingMatch] = useState(null);
  const [editFormData, setEditFormData] = useState({
    matchDate: '',
    stadium: '',
    status: '',
    score1: '',
    score2: ''
  });

  const loadTournament = async () => {
    const token = sessionStorage.getItem("authToken");
    const res = await fetch(`http://localhost:8080/api/tournaments/${tournamentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setTournament(data);
    if (data.intervalDays) {
      setCustomIntervalDays(data.intervalDays.toString());
    }
  };

  const loadTeams = async () => {
    const token = sessionStorage.getItem("authToken");
    const res = await fetch(`http://localhost:8080/api/participant/tournaments/${tournamentId}/participants`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    const teamList = data.map(p => p.teamDTO);
    setTeams(teamList);
  };

  const loadMatches = async () => {
    const token = sessionStorage.getItem("authToken");
    const res = await fetch(`http://localhost:8080/api/matches/tournaments/${tournamentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setMatches(data);
    setLoading(false);
  };

  const regenerateSchedule = async () => {
    setIsRegenerating(true);
    const token = sessionStorage.getItem("authToken");
    if (!teams || teams.length === 0) {
      alert("No participating teams found");
      return;
    }
    const interval = parseInt(customIntervalDays) || tournament.intervalDays || 7;
    if (interval < 1) {
      alert("Match interval days must be at least 1");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/schedules/generate/${tournament.matchFormat.toLowerCase()}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          teamIds: teams.map(t => t.id),
          teamNames: teams.map(t => t.name),
          homeStadiums: teams.map(t => t.homeStadium),
          startDate: new Date(tournament.leagueStart).toISOString().slice(0, 10),
          intervalDays: interval,
          doubleRound: tournament.doubleRound,
          groups: tournament.groups,
          advanceCount: tournament.advanceCount,
          rounds: tournament.rounds,
          tournamentId: tournament.id
        })
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to regenerate schedule");
      }

      await loadMatches();
    } catch (error) {
      console.error("Regeneration error:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleEditClick = (match) => {
    setEditingMatch(match);
    setEditFormData({
      matchDate: match.matchDate.slice(0, 16), // Format for datetime-local input
      stadium: match.stadium || '',
      status: match.status,
      score1: match.score1 || '',
      score2: match.score2 || ''
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = async () => {
    const token = sessionStorage.getItem("authToken");
    try {
      const updatedMatch = {
        ...editingMatch,
        matchDate: editFormData.matchDate,
        stadium: editFormData.stadium,
        status: editFormData.status,
        score1: parseInt(editFormData.score1) || 0,
        score2: parseInt(editFormData.score2) || 0
      };

      const res = await fetch(`http://localhost:8080/api/matches/${editingMatch.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedMatch)
      });

      if (!res.ok) {
        throw new Error("Failed to update match");
      }

      alert("Match updated successfully!");

      await loadMatches();
      setEditingMatch(null);
    } catch (error) {
      console.error("Update error:", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([loadTournament(), loadTeams(), loadMatches()]);
      } catch (error) {
        console.error("Loading error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [tournamentId]);

  if (loading || !tournament) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress size={60} />
      </Box>
    );
  }

  const renderMatchItem = (match, index) => {
    const isCompleted = match.status === 'COMPLETED';
    
    return (
      <React.Fragment key={index}>
        <MatchListItem alignItems="flex-start">
          <ListItemAvatar>
            <TeamAvatar>
              <MatchIcon fontSize="small" />
            </TeamAvatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Box display="flex" alignItems="center" flexWrap="wrap">
                <Typography variant="subtitle1" component="span" fontWeight="bold">
                  {match.team1.name}
                </Typography>
                <Typography component="span" mx={1}>vs</Typography>
                <Typography variant="subtitle1" component="span" fontWeight="bold">
                  {match.team2.name}
                </Typography>
                {isCompleted && (
                  <ScoreChip
                    label={`${match.score1} - ${match.score2}`}
                    size="small"
                    color="primary"
                  />
                )}
                <Button 
                  size="small" 
                  startIcon={<EditIcon />} 
                  onClick={() => handleEditClick(match)}
                  sx={{ ml: 'auto' }}
                >
                  Edit
                </Button>
              </Box>
            }
            secondary={
              <Grid container spacing={1} mt={0.5}>
                <Grid item xs={12} sm={6} md={4}>
                  <Box display="flex" alignItems="center">
                    <DateIcon color="action" fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(match.matchDate)}
                    </Typography>
                  </Box>
                </Grid>
                
                {match.stadium && (
                  <Grid item xs={12} sm={6} md={4}>
                    <Box display="flex" alignItems="center">
                      <StadiumIcon color="action" fontSize="small" sx={{ mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        {match.stadium}
                      </Typography>
                    </Box>
                  </Grid>
                )}
                
                <Grid item xs={12} sm={6} md={4}>
                  <Box display="flex" alignItems="center">
                    <RoundIcon color="action" fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      Round {match.round}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                  <Box display="flex" alignItems="center">
                    <StatusIcon color="action" fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {match.status.charAt(0) + match.status.slice(1).toLowerCase().replace('_', ' ')}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            }
          />
        </MatchListItem>
        {index < matches.length - 1 && <Divider variant="inset" component="li" />}
      </React.Fragment>
    );
  };

  return (
    <StyledPaper>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Match Schedule
          </Typography>
          <Box display="flex" alignItems="center">
            <TournamentIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="body1" color="text.secondary">
              {tournament.name}
              {tournament.shortName && ` (${tournament.shortName})`}
            </Typography>
          </Box>
        </Box>
        
        <Box display="flex" gap={2} alignItems="center">
          <Tooltip title="Days between matches">
            <TextField
              label="Match Interval"
              type="number"
              size="small"
              sx={{ width: 140 }}
              value={customIntervalDays}
              onChange={(e) => setCustomIntervalDays(e.target.value)}
              inputProps={{ min: 1 }}
              variant="outlined"
            />
          </Tooltip>
          
          <Button
            variant="contained"
            color="primary"
            startIcon={isRegenerating ? <CircularProgress size={20} /> : <RefreshIcon />}
            onClick={regenerateSchedule}
            disabled={isRegenerating}
          >
            Regenerate
          </Button>
        </Box>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <MatchIcon color="primary" sx={{ mr: 1 }} />
          All Matches
        </Typography>
        
        {matches.length === 0 ? (
          <Box textAlign="center" py={4}>
            <Typography variant="body1" color="text.secondary">
              No matches scheduled yet
            </Typography>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={regenerateSchedule}
              startIcon={<RefreshIcon />}
              sx={{ mt: 2 }}
            >
              Generate Schedule
            </Button>
          </Box>
        ) : (
          <List dense sx={{ maxHeight: '600px', overflow: 'auto', pr: 1 }}>
            {matches
              .sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate))
              .map(renderMatchItem)}
          </List>
        )}
      </Box>

      {/* Edit Match Dialog */}
      <Dialog open={!!editingMatch} onClose={() => setEditingMatch(null)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <EditIcon color="primary" sx={{ mr: 1 }} />
            Edit Match: {editingMatch?.team1?.name} vs {editingMatch?.team2?.name}
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Match Date & Time"
                type="datetime-local"
                fullWidth
                name="matchDate"
                value={editFormData.matchDate}
                onChange={handleEditFormChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Stadium"
                fullWidth
                name="stadium"
                value={editFormData.stadium}
                onChange={handleEditFormChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  name="status"
                  value={editFormData.status}
                  onChange={handleEditFormChange}
                >
                  {statusOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label={`${editingMatch?.team1?.name} Score`}
                type="number"
                fullWidth
                name="score1"
                value={editFormData.score1}
                onChange={handleEditFormChange}
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label={`${editingMatch?.team2?.name} Score`}
                type="number"
                fullWidth
                name="score2"
                value={editFormData.score2}
                onChange={handleEditFormChange}
                inputProps={{ min: 0 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            startIcon={<CloseIcon />} 
            onClick={() => setEditingMatch(null)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button 
            startIcon={<SaveIcon />} 
            onClick={handleSaveEdit}
            variant="contained"
            color="primary"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </StyledPaper>
  );
};

export default ScheduleManager;