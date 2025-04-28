import React, { useEffect, useState } from "react";
import {
  Typography, Paper, List, Box, CircularProgress, Alert,
  Chip, Divider, Button, Stack, ToggleButton, ToggleButtonGroup,
  Snackbar, Alert as MuiAlert
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ParticipantListItem from "./ParticipantListItem";

const TeamApprovalList = ({ tournamentId }) => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("ALL");

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const loadPendingParticipants = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`http://localhost:8080/api/participant/tournaments/${tournamentId}/participants`);

      if (!res.ok) {
        throw new Error(`Failed to load participants: ${res.status}`);
      }

      const data = await res.json();
      const sorted = data.sort((a, b) => {
        if (a.status === "PENDING" && b.status !== "PENDING") return -1;
        if (a.status !== "PENDING" && b.status === "PENDING") return 1;
        return 0;
      });
      console.log(data)
      setParticipants(sorted);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDecision = async (participantId, approve) => {
    try {
      const token = sessionStorage.getItem("authToken");
      const res = await fetch(
        `http://localhost:8080/api/participant/tournaments/${tournamentId}/participants/${participantId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ status: approve ? "APPROVED" : "REJECTED" })
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      setSnackbarSeverity("success");
      setSnackbarMessage(approve ? "Team approved successfully!" : "Team rejected successfully!");
      setSnackbarOpen(true);

      loadPendingParticipants();
    } catch (err) {
      setError(err.message);
      setSnackbarSeverity("error");
      setSnackbarMessage("Operation failed. Please try again.");
      setSnackbarOpen(true);
    }
  };

  const filteredParticipants = participants.filter(participant => {
    return filter === "ALL" || participant.status === filter;
  });

  useEffect(() => {
    loadPendingParticipants();
  }, [tournamentId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress size={60} thickness={4} sx={{ color: "primary.main" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
        severity="error"
        sx={{ m: 2 }}
        action={
          <Button
            color="inherit"
            size="small"
            onClick={loadPendingParticipants}
            startIcon={<RefreshIcon />}
          >
            Retry
          </Button>
        }
      >
        {error}
      </Alert>
    );
  }

  return (
    <>
      <Paper sx={{
        p: 3,
        borderRadius: 4,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
        background: 'linear-gradient(to bottom, #ffffff, #f9f9f9)'
      }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" sx={{
            fontWeight: 700,
            color: 'primary.dark',
            display: 'flex',
            alignItems: 'center',
            fontFamily: '"Roboto Condensed", sans-serif'
          }}>
            Team Applications
            <Chip
              label={`${filteredParticipants.length} teams`}
              size="small"
              sx={{
                ml: 2,
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                fontWeight: 600
              }}
            />
          </Typography>

          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={loadPendingParticipants}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: 2
            }}
          >
            Refresh
          </Button>
        </Stack>

        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(e, newFilter) => newFilter && setFilter(newFilter)}
          sx={{ mb: 3 }}
        >
          <ToggleButton value="ALL" sx={{ textTransform: 'none', px: 3 }}>
            All
          </ToggleButton>
          <ToggleButton value="PENDING" sx={{ textTransform: 'none', px: 3 }}>
            Pending
          </ToggleButton>
          <ToggleButton value="APPROVED" sx={{ textTransform: 'none', px: 3 }}>
            Approved
          </ToggleButton>
          <ToggleButton value="REJECTED" sx={{ textTransform: 'none', px: 3 }}>
            Rejected
          </ToggleButton>
        </ToggleButtonGroup>

        <Divider sx={{
          mb: 3,
          borderColor: 'divider',
          borderBottomWidth: 2
        }} />

        {filteredParticipants.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="200px"
            textAlign="center"
            p={4}
          >
            <Typography variant="h6" color="text.secondary" mb={2}>
              {filter !== "ALL"
                ? `No ${filter.toLowerCase()} teams`
                : "No team applications yet"}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {filter !== "ALL"
                ? "Try changing the filter criteria"
                : "Check back later or share the tournament link"}
            </Typography>
          </Box>
        ) : (
          <List sx={{
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider'
          }}>
            {filteredParticipants.map((participant, index) => (
              <ParticipantListItem
                key={participant.id}
                participant={participant}
                onDecision={handleDecision}
                showDivider={index < filteredParticipants.length - 1}
              />
            ))}
          </List>
        )}
      </Paper>

      {/* Snackbar for success/error */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          elevation={6}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default TeamApprovalList;
