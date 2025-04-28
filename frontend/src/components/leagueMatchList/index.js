import React from "react";
import {
    Paper, Box, Typography, Button, List, ListItem, Avatar,
    Divider, Chip, useTheme, Grid
} from "@mui/material";
import { SportsSoccer as MatchIcon, CalendarToday as DateIcon, LocationOn as LocationIcon } from "@mui/icons-material";
import { LocationOn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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

const MatchList = ({ matches }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    if (!matches || matches.length === 0) {
        return (
            <Paper sx={{ p: 3, textAlign: "center" }}>
                <Typography color="text.secondary">No matches scheduled</Typography>
            </Paper>
        );
    }

    return (
        <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
            <Box sx={{ maxHeight: 480, overflowY: "auto" }}>
                <List sx={{ py: 0 }}>
                    {matches.map((match, index) => {
                        const isCompleted = match.status === "COMPLETED";
                        const isInProgress = match.status === "IN_PROGRESS";
                        const isScheduled = match.status === "SCHEDULED";

                        return (
                            <React.Fragment key={match.id}>
                                <ListItem
                                    sx={{
                                        py: 2.5,
                                        px: 3,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        "&:hover": { backgroundColor: theme.palette.action.hover },
                                    }}
                                >
                                    {/* Left team info */}
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: 140 }}>
                                        <Avatar src={match.team1.logoUrl} alt={match.team1.name} />
                                        <Typography variant="subtitle1" fontWeight="bold">{match.team1.name}</Typography>
                                    </Box>

                                    <Typography variant="body1" color="text.secondary">vs</Typography>

                                    {/* Right team info */}
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: 140 }}>
                                        <Avatar src={match.team2.logoUrl} alt={match.team2.name} />
                                        <Typography variant="subtitle1" fontWeight="bold">{match.team2.name}</Typography>
                                    </Box>

                                    {/* Match details */}
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={1} mt={0.5}>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <Box display="flex" alignItems="center">
                                                    <DateIcon color="action" fontSize="small" sx={{ mr: 0.5 }} />
                                                    <Typography variant="body2" color="text.secondary">{formatDate(match.matchDate)}</Typography>
                                                </Box>
                                            </Grid>

                                            {match.stadium && (
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <Box display="flex" alignItems="center">
                                                        <LocationOn color="action" fontSize="small" sx={{ mr: 0.5 }} />
                                                        <Typography variant="body2" color="text.secondary">{match.stadium}</Typography>
                                                    </Box>
                                                </Grid>
                                            )}
                                        </Grid>
                                    </Box>

                                    {/* Match status and score */}
                                    <Box>
                                        {isScheduled && (
                                            <Chip label="Scheduled" color="info" size="small" sx={{ fontWeight: "bold" }} />
                                        )}
                                        {isInProgress && (
                                            <Chip label="In Progress" color="warning" size="small" sx={{ fontWeight: "bold" }} />
                                        )}
                                        {isCompleted && (
                                            <Chip label="Completed" color="success" size="small" sx={{ fontWeight: "bold" }} />
                                        )}
                                        {isCompleted && (
                                            <Typography variant="h6" fontWeight="bold" sx={{ ml: 2 }}>
                                                {match.score1} - {match.score2}
                                            </Typography>
                                        )}
                                    </Box>

                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{ ml: 2 }}
                                        onClick={() => navigate(`/matches/${match.id}`)} 
                                    >
                                        Details
                                    </Button>
                                </ListItem>
                                {index < matches.length - 1 && <Divider variant="inset" component="li" />}
                            </React.Fragment>
                        );
                    })}
                </List>
            </Box>
        </Paper>
    );
};

export default MatchList;
