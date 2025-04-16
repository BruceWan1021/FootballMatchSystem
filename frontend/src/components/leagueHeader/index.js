import React from "react";
import { Box, Typography, Stack, Divider, Chip, Paper, Grid, Button } from "@mui/material";
import { CalendarToday, People, EventAvailable, EventBusy, LocationOn } from "@mui/icons-material";

const LeagueHeader = ({ tournament, handleJoinTournament, formatDate }) => {
    const now = new Date();
    const signupEndDate = new Date(tournament.signupEnd);
    const showJoinButton = now <= signupEndDate;

    return (
        <Box sx={{ mb: 4 }}>
            {/* Header Section */}
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                flexWrap: 'wrap',
                gap: 2
            }}>
                <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{
                        color: 'primary.main',
                        fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                        textShadow: '0px 2px 4px rgba(0,0,0,0.1)'
                    }}
                >
                    {tournament.name}
                </Typography>

                {showJoinButton && (
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleJoinTournament}
                        sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            fontWeight: 'bold',
                            textTransform: 'none',
                            fontSize: '1rem',
                            boxShadow: '0px 4px 12px rgba(25, 118, 210, 0.3)',
                            '&:hover': {
                                boxShadow: '0px 6px 14px rgba(25, 118, 210, 0.4)',
                                transform: 'translateY(-1px)'
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Join League
                    </Button>
                )}

            </Box>

            {/* Info Chips */}
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                    mb: 3,
                    flexWrap: 'wrap',
                    rowGap: 1.5
                }}
            >
                <Chip
                    label={`Season: ${tournament.season || 'N/A'}`}
                    color="secondary"
                    size="medium"
                    icon={<EventAvailable fontSize="small" />}
                    sx={{ fontWeight: 500 }}
                />
                <Chip
                    label={`Host: ${tournament.hostSchool}`}
                    size="medium"
                    icon={<LocationOn fontSize="small" />}
                    sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                        '& .MuiChip-icon': { color: 'error.main' }
                    }}
                />
                {tournament.requiresApproval && (
                    <Chip
                        label="Approval Required"
                        color="warning"
                        size="medium"
                        sx={{ fontWeight: 500 }}
                    />
                )}
            </Stack>

            <Divider sx={{
                my: 3,
                borderColor: 'divider',
                borderBottomWidth: 2,
                opacity: 0.8
            }} />

            {/* Details Section */}
            <Grid container spacing={3}>
                {/* Dates Section */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{
                        p: 3,
                        borderRadius: 3,
                        bgcolor: 'background.paper',
                        height: '100%',
                        borderLeft: '4px solid',
                        borderColor: 'primary.main',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)'
                        }
                    }}>
                        <Typography
                            variant="h5"
                            gutterBottom
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 600,
                                color: 'text.primary'
                            }}
                        >
                            <CalendarToday color="primary" sx={{ mr: 1.5 }} />
                            Tournament Dates
                        </Typography>

                        <Box sx={{ pl: 2.5 }}>
                            <Typography
                                variant="subtitle1"
                                gutterBottom
                                sx={{
                                    mt: 2,
                                    fontWeight: 500,
                                    color: 'text.secondary'
                                }}
                            >
                                Signup Period
                            </Typography>
                            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                                <Chip
                                    label={formatDate(tournament.signupStart)}
                                    icon={<EventAvailable fontSize="small" />}
                                    variant="outlined"
                                    color="primary"
                                    sx={{ fontWeight: 500 }}
                                />
                                <Chip
                                    label={formatDate(tournament.signupEnd)}
                                    icon={<EventBusy fontSize="small" />}
                                    variant="outlined"
                                    color="primary"
                                    sx={{ fontWeight: 500 }}
                                />
                            </Stack>

                            <Typography
                                variant="subtitle1"
                                gutterBottom
                                sx={{
                                    mt: 3,
                                    fontWeight: 500,
                                    color: 'text.secondary'
                                }}
                            >
                                League Period
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                <Chip
                                    label={formatDate(tournament.leagueStart)}
                                    icon={<EventAvailable fontSize="small" />}
                                    variant="outlined"
                                    color="primary"
                                    sx={{ fontWeight: 500 }}
                                />
                                <Chip
                                    label={formatDate(tournament.leagueEnd)}
                                    icon={<EventBusy fontSize="small" />}
                                    variant="outlined"
                                    color="primary"
                                    sx={{ fontWeight: 500 }}
                                />
                            </Stack>
                        </Box>
                    </Paper>
                </Grid>

                {/* Team Info Section */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{
                        p: 3,
                        borderRadius: 3,
                        bgcolor: 'background.paper',
                        height: '100%',
                        borderLeft: '4px solid',
                        borderColor: 'secondary.main',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)'
                        }
                    }}>
                        <Typography
                            variant="h5"
                            gutterBottom
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 600,
                                color: 'text.primary'
                            }}
                        >
                            <People color="secondary" sx={{ mr: 1.5 }} />
                            Team Information
                        </Typography>

                        <Grid container spacing={3} sx={{ pl: 1, mt: 1 }}>
                            <Grid item xs={6}>
                                <Box sx={{
                                    backgroundColor: 'rgba(25, 118, 210, 0.05)',
                                    p: 2,
                                    borderRadius: 2,
                                    height: '100%'
                                }}>
                                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                        Min Teams
                                    </Typography>
                                    <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                                        {tournament.minTeams}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box sx={{
                                    backgroundColor: 'rgba(25, 118, 210, 0.05)',
                                    p: 2,
                                    borderRadius: 2,
                                    height: '100%'
                                }}>
                                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                        Max Teams
                                    </Typography>
                                    <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                                        {tournament.maxTeams}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box sx={{
                                    backgroundColor: 'rgba(25, 118, 210, 0.05)',
                                    p: 2,
                                    borderRadius: 2,
                                    height: '100%'
                                }}>
                                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                        Min Players
                                    </Typography>
                                    <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                                        {tournament.minPlayersPerTeam}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box sx={{
                                    backgroundColor: 'rgba(25, 118, 210, 0.05)',
                                    p: 2,
                                    borderRadius: 2,
                                    height: '100%'
                                }}>
                                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                        Max Players
                                    </Typography>
                                    <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                                        {tournament.maxPlayersPerTeam}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LeagueHeader;