import React, { useEffect, useState } from "react";
import {
  Typography, Paper, List, ListItem, ListItemText,
  Button, Divider, Box, CircularProgress, TextField,
  Grid, Avatar, ListItemAvatar, Chip, Tooltip
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
  Close as CloseIcon,
  AddCircle as AddEventIcon
} from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import AddEventDialog from '../scheduleManager/AddEventDialog';
import EditMatchDialog from '../scheduleManager/EditMatchDialog';

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

  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);  // 编辑对话框的状态

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

  const handleEditClick = (match) => {
    if (match.status !== 'IN_PROGRESS' && match.status !== 'COMPLETED') {
      setEditingMatch(match);
      setEditDialogOpen(true);
    }
  };

  const handleEventDialogOpen = (match) => {
    setEditingMatch(match);
    setEventDialogOpen(true);
  };

  const handleUpdateMatch = (updatedMatchData) => {
    setMatches(matches.map(match =>
      match.id === updatedMatchData.id ? updatedMatchData : match
    ));
  };

  const handleSaveEvent = async (updatedEvent) => {
    const token = sessionStorage.getItem("authToken");

    try {
      const response = await fetch(`http://localhost:8080/api/matches/${editingMatch.id}/events`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });

      const result = await response.json();



        alert("Successfully Add Event!!!");

        await loadMatches();
        setEventDialogOpen(false);
      
    } catch (error) {
      console.error("Error saving event:", error);
      alert(error.message);
    }
  };

  const renderMatchItem = (match, index) => {
    const isCompleted = match.status === 'COMPLETED';
    const isInProgress = match.status === 'IN_PROGRESS';

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
                  startIcon={isInProgress || isCompleted ? <AddEventIcon /> : <EditIcon />}
                  onClick={isInProgress || isCompleted ? () => handleEventDialogOpen(match) : () => handleEditClick(match)}
                  sx={{ ml: 'auto' }}
                >
                  {isInProgress || isCompleted ? 'Add Event' : 'Edit'}
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

      {/* 编辑比赛对话框 */}
      <EditMatchDialog
        open={editDialogOpen}
        match={editingMatch}
        onClose={() => setEditDialogOpen(false)}
        onUpdateMatch={handleUpdateMatch}
      />

      {/* 添加事件对话框 */}
      <AddEventDialog
        open={eventDialogOpen}
        match={editingMatch}
        onClose={() => setEventDialogOpen(false)}
        onAddEvent={handleSaveEvent}
      />
    </StyledPaper>
  );
};

export default ScheduleManager;
