import React, { useState, useEffect } from "react";
import { Container, Typography, Tabs, Tab, Grid, CircularProgress, Box, Paper, Button, useTheme, useMediaQuery } from "@mui/material";
import { SportsSoccer, Groups } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import LeagueCard from "../components/leagueCard";

const MyOrganizationsPage = () => {
    const [tab, setTab] = useState(0);  
    const [tournaments, setTournaments] = useState([]);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        const fetchData = async () => {
            const token = sessionStorage.getItem("authToken");

            try {
                setLoading(true);
                const [resTournaments, resTeams] = await Promise.all([
                    fetch("http://localhost:8080/api/tournaments/my", {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    fetch("http://localhost:8080/api/teams/my", {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);

                const dataTournaments = await resTournaments.json();
                const dataTeams = await resTeams.json();

                setTournaments(dataTournaments);
                setTeams(dataTeams);
            } catch (err) {
                console.error("Failed to load organizations:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };
    

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{
                mt: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "60vh"
            }}>
                <CircularProgress size={60} thickness={4} sx={{ color: theme.palette.primary.main }} />
                <Typography variant="h6" sx={{ mt: 3, color: theme.palette.text.secondary }}>
                    Loading your organizations...
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{
            mt: { xs: 2, md: 4 },
            mb: 6,
            px: { xs: 2, sm: 3 }
        }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" fontWeight="bold" gutterBottom sx={{
                    color: theme.palette.text.primary,
                    fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" }
                }}>
                    My Organizations
                </Typography>

                <Typography variant="subtitle1" sx={{
                    color: theme.palette.text.secondary,
                    mb: 3
                }}>
                    Manage your tournaments and teams in one place
                </Typography>

                <Paper elevation={0} sx={{
                    borderRadius: 2,
                    mb: 4,
                    border: `1px solid ${theme.palette.divider}`
                }}>
                    <Tabs
                        value={tab}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        indicatorColor="primary"
                        textColor="primary"
                        sx={{
                            "& .MuiTabs-flexContainer": {
                                justifyContent: "space-around"
                            }
                        }}
                    >
                        <Tab
                            label="Tournaments"
                            sx={{
                                py: 2,
                                fontSize: isMobile ? "0.875rem" : "1rem",
                                textTransform: "none",
                                fontWeight: 600
                            }}
                        />
                        <Tab
                            label="Teams"
                            sx={{
                                py: 2,
                                fontSize: isMobile ? "0.875rem" : "1rem",
                                textTransform: "none",
                                fontWeight: 600
                            }}
                        />
                    </Tabs>
                </Paper>
            </Box>

            {tab === 0 && (
                <Box>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3
                    }}>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                            My Tournaments
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/create-league")}
                            sx={{
                                textTransform: "none",
                                borderRadius: 2,
                                px: 3,
                                py: 1
                            }}
                        >
                            Create New Tournament
                        </Button>
                    </Box>

                    <Grid container spacing={3}>
                        {tournaments.length === 0 ? (
                            <Grid item xs={12}>
                                <Paper elevation={0} sx={{
                                    p: 4,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                    border: `1px dashed ${theme.palette.divider}`,
                                    borderRadius: 2
                                }}>
                                    <SportsSoccer
                                        sx={{
                                            fontSize: 60,
                                            color: theme.palette.text.disabled,
                                            mb: 2
                                        }}
                                    />
                                    <Typography variant="h6" sx={{ mb: 1 }}>
                                        No Tournaments Yet
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                                        You haven't created or joined any tournaments
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => navigate("/leagues")}
                                        sx={{
                                            textTransform: "none",
                                            borderRadius: 2,
                                            px: 3
                                        }}
                                    >
                                        Browse Tournaments
                                    </Button>
                                </Paper>
                            </Grid>
                        ) : (
                            tournaments.map((tournament) => {
                                const now = new Date();
                                const start = new Date(tournament.startDate);
                                const end = new Date(tournament.endDate);

                                let status = "Upcoming";
                                if (now >= start && now <= end) status = "Ongoing";
                                else if (now > end) status = "Completed";

                                const leagueCardData = {
                                    id: tournament.id,
                                    name: tournament.name,
                                    startDate: tournament.startDate,
                                    endDate: tournament.endDate,
                                    department: tournament.hostSchool || tournament.location,
                                    teams: tournament.maxTeams || tournament.teamCount || 0,
                                    gender: tournament.gender,
                                    status,
                                    bannerUrl: tournament.logoUrl || `https://source.unsplash.com/random/400x180/?sports,tournament,${encodeURIComponent(tournament.name)}`
                                };

                                return (
                                    <Grid item xs={12} sm={6} md={4} key={tournament.id}>
                                        <LeagueCard
                                            league={leagueCardData}
                                            onViewDetails={() => navigate(`/league-manage/${tournament.id}`)}
                                            elevation={3}
                                        />
                                    </Grid>
                                );
                            })
                        )}
                    </Grid>
                </Box>
            )}

            {tab === 1 && (
                <Box>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3
                    }}>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                            My Teams
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/create-team")}
                            sx={{
                                textTransform: "none",
                                borderRadius: 2,
                                px: 3,
                                py: 1
                            }}
                        >
                            Create New Team
                        </Button>
                    </Box>

                    <Grid container spacing={3}>
                        {teams.length === 0 ? (
                            <Grid item xs={12}>
                                <Paper elevation={0} sx={{
                                    p: 4,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                    border: `1px dashed ${theme.palette.divider}`,
                                    borderRadius: 2
                                }}>
                                    <Groups
                                        sx={{
                                            fontSize: 60,
                                            color: theme.palette.text.disabled,
                                            mb: 2
                                        }}
                                    />
                                    <Typography variant="h6" sx={{ mb: 1 }}>
                                        No Teams Yet
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                                        You haven't created or joined any teams
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => navigate("/teams")}
                                        sx={{
                                            textTransform: "none",
                                            borderRadius: 2,
                                            px: 3
                                        }}
                                    >
                                        Browse Teams
                                    </Button>
                                </Paper>
                            </Grid>
                        ) : (
                            teams.map((team) => {
                                const teamCardData = {
                                    id: team.id,
                                    name: team.name,
                                    startDate: "",
                                    endDate: "",
                                    department: team.homeGround,
                                    teams: team.playerCount || 0,
                                    gender: team.gender,
                                    status: team.status || "Active",
                                    bannerUrl: team.logoUrl || `https://source.unsplash.com/random/400x180/?sports,team,${encodeURIComponent(team.name)}`
                                };

                                return (
                                    <Grid item xs={12} sm={6} md={4} key={team.id}>
                                        <LeagueCard
                                            league={teamCardData}
                                            onViewDetails={() => navigate(`/team/${team.id}`)}
                                            elevation={3}
                                        />
                                    </Grid>
                                );
                            })
                        )}
                    </Grid>
                </Box>
            )}
        </Container>
    );
};

export default MyOrganizationsPage;