import React from "react";
import { Grid, Card, CardContent, Avatar, Typography, Chip, Box, Paper, useTheme, Divider, LinearProgress, Tooltip } from "@mui/material";
import {
    SportsSoccer as TeamIcon,
    EmojiEvents as TrophyIcon,
    Equalizer as StatsIcon,
    TrendingUp as TrendUpIcon,
    TrendingDown as TrendDownIcon,
    LocationCity as StadiumIcon,
    People as PlayersIcon
} from "@mui/icons-material";

const TeamList = ({ teams }) => {
    const theme = useTheme();

    if (!teams || teams.length === 0) {
        return (
            <Paper elevation={0} sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="body1" color="text.secondary">
                    No teams available
                </Typography>
            </Paper>
        );
    }

    // Sort teams by points for ranking
    const sortedTeams = [...teams].sort((a, b) => b.points - a.points);

    return (
        <Box sx={{ p: 2 }}>
            <Grid container spacing={3}>
                {sortedTeams.map((team, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={team.id}>
                        <Card
                            elevation={3}
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                transition: "transform 0.2s",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: theme.shadows[6]
                                }
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1 }}>
                                {/* Ranking Badge */}
                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                    <Chip
                                        label={`#${index + 1}`}
                                        size="small"
                                        color={
                                            index < 2
                                                ? "success"
                                                : index < 4
                                                    ? "primary"
                                                    : index >= teams.length - 2
                                                        ? "error"
                                                        : "default"
                                        }
                                        sx={{ fontWeight: "bold" }}
                                    />
                                    {team.form && (
                                        <Tooltip title="Recent form">
                                            <Box sx={{ display: "flex", gap: 0.5 }}>
                                                {team.form.split("").map((result, i) => (
                                                    <Box
                                                        key={i}
                                                        sx={{
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: "50%",
                                                            bgcolor:
                                                                result === "W"
                                                                    ? theme.palette.success.main
                                                                    : result === "D"
                                                                        ? theme.palette.warning.main
                                                                        : theme.palette.error.main
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        </Tooltip>
                                    )}
                                </Box>

                                {/* Team Info */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        textAlign: "center",
                                        gap: 1,
                                        mb: 2
                                    }}
                                >
                                    <Avatar
                                        src={team.logo}
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            bgcolor: theme.palette.primary.light,
                                            mb: 1
                                        }}
                                    >
                                        {team.logo ? null : <TeamIcon fontSize="large" />}
                                    </Avatar>
                                    <Typography variant="h6" fontWeight="bold">
                                        {team.name}
                                    </Typography>

                                    {team.coach && (
                                        <Typography variant="caption" color="text.secondary">
                                            Coach: {team.coach}
                                        </Typography>
                                    )}
                                </Box>

                                <Divider sx={{ my: 1 }} />

                                {/* Stats Overview */}
                                <Box sx={{ mb: 2 }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                        <Typography variant="caption">Points</Typography>
                                        <Typography fontWeight="bold">{team.points || 0}</Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                        <Typography variant="caption">Record</Typography>
                                        <Typography variant="body2">
                                            {team.wins || 0}W - {team.draws || 0}D - {team.losses || 0}L
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography variant="caption">Goal Diff</Typography>
                                        <Typography
                                            fontWeight="bold"
                                            color={team.goalDifference > 0 ? "success.main" : team.goalDifference < 0 ? "error.main" : "text.primary"}
                                        >
                                            {team.goalDifference > 0 ? "+" : ""}{team.goalDifference || 0}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Progress bar for visual ranking indicator */}
                                <Tooltip title="Points percentage">
                                    <LinearProgress
                                        variant="determinate"
                                        value={(team.points / (sortedTeams[0].points * 1.2)) * 100}
                                        sx={{
                                            height: 6,
                                            borderRadius: 3,
                                            mb: 2,
                                            bgcolor: theme.palette.grey[200],
                                            "& .MuiLinearProgress-bar": {
                                                bgcolor: index < 4 ? theme.palette.primary.main : theme.palette.secondary.main
                                            }
                                        }}
                                    />
                                </Tooltip>
                            </CardContent>

                            {/* Footer with additional info */}
                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: theme.palette.grey[100],
                                    display: "flex",
                                    justifyContent: "center",
                                    flexWrap: "wrap",
                                    gap: 1
                                }}
                            >
                                {team.trophies > 0 && (
                                    <Chip
                                        icon={<TrophyIcon fontSize="small" />}
                                        label={team.trophies}
                                        size="small"
                                        color="warning"
                                    />
                                )}
                                {team.stadium && (
                                    <Chip
                                        icon={<StadiumIcon fontSize="small" />}
                                        label={team.stadium}
                                        size="small"
                                    />
                                )}
                                {team.playerCount && (
                                    <Chip
                                        icon={<PlayersIcon fontSize="small" />}
                                        label={`${team.playerCount}`}
                                        size="small"
                                    />
                                )}
                            </Box>

                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default TeamList;