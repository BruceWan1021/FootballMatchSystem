import React, { useState, useEffect } from "react";
import {
  ListItem, ListItemText, IconButton, Typography,
  Box, Tooltip, Chip, Divider, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, List, ListItemButton
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";

const getStatusChip = (status) => {
  const statusMap = {
    PENDING: {
      icon: <PendingActionsIcon fontSize="small" />,
      color: "warning",
      label: "Pending"
    },
    APPROVED: {
      icon: <CheckCircleOutlineIcon fontSize="small" />,
      color: "success",
      label: "Approved"
    },
    REJECTED: {
      icon: <DoNotDisturbAltIcon fontSize="small" />,
      color: "error",
      label: "Rejected"
    }
  };

  return (
    <Chip
      icon={statusMap[status]?.icon}
      label={statusMap[status]?.label || status}
      color={statusMap[status]?.color || "default"}
      variant="outlined"
      size="small"
      sx={{ ml: 1 }}
    />
  );
};

const ParticipantListItem = ({ participant, onDecision, showDivider }) => {
  const [open, setOpen] = useState(false);

  const handleOpenDetails = () => setOpen(true);
  const handleCloseDetails = () => setOpen(false);
  const [players, setPlayers] = useState([]);

  const fetchPlayers = async (teamId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/participant/teams/${teamId}/participants`);
      const data = await response.json();
      console.log(data)
      setPlayers(data);
    } catch (error) {
      console.error("Failed to fetch players:", error);
    }
  };

    useEffect(() => {
    if (open) {

      fetchPlayers(participant.teamDTO.id);
    }
  }, [open, participant]);

  const contacts = participant.teamDTO?.contacts || [];

  const firstContact = contacts[0];

  return (
    <>
      <ListItem
        sx={{
          backgroundColor: participant.status === "PENDING"
            ? 'rgba(255, 167, 38, 0.08)'
            : 'transparent',
          borderRadius: 1,
          transition: 'background-color 0.2s',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
          }
        }}
        secondaryAction={
          <Box display="flex" alignItems="center">
            <Tooltip title="View Details">
              <IconButton onClick={handleOpenDetails} color="primary" sx={{ mr: 1 }}>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
            {participant.status === "PENDING" ? (
              <>
                <Tooltip title="Approve">
                  <IconButton
                    onClick={() => onDecision(participant.id, true)}
                    color="success"
                    sx={{ mr: 1 }}
                  >
                    <CheckIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Reject">
                  <IconButton
                    onClick={() => onDecision(participant.id, false)}
                    color="error"
                  >
                    <ClearIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              getStatusChip(participant.status)
            )}
          </Box>
        }
      >
        <ListItemText
          primary={(
            <Typography variant="subtitle1" fontWeight={500}>
              {participant.teamDTO?.name ?? "Unnamed Team"}
            </Typography>
          )}
          secondary={(
            <>
              {firstContact && (
                <Typography variant="body2" color="text.secondary">
                  <strong>{firstContact.name}</strong> - {firstContact.role}
                  <br />
                  Email: <a href={`mailto:${firstContact.email}`}>{firstContact.email}</a>
                  <br />
                  Phone: {firstContact.phone}
                </Typography>
              )}
              {participant.teamDTO?.description && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {participant.teamDTO.description}
                </Typography>
              )}
            </>
          )}
          sx={{ pr: 4 }}
        />
      </ListItem>

      {/* Player List Dialog */}
      <Dialog open={open} onClose={handleCloseDetails} maxWidth="sm" fullWidth>
        <DialogTitle>{participant.teamDTO?.name}'s Players</DialogTitle>
        <DialogContent dividers>
          {players.length > 0 ? (
            <List>
              {players.map((player, idx) => (
                <ListItem key={idx} disablePadding>
                  <ListItemButton>
                    <ListItemText
                      primary={`${player.playerProfileDTO.username}`}
                      secondary={`Number: ${player.playerProfileDTO.number} | Position: ${player.playerProfileDTO.position}`}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No players found for this team.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Close</Button>
        </DialogActions>
      </Dialog>

      {showDivider && <Divider variant="inset" component="li" />}
    </>
  );
};

export default ParticipantListItem;
