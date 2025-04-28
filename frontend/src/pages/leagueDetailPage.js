import React, { useEffect, useState } from "react";
import { 
  Box, Typography, Container, Grid, Paper, 
  Avatar, CircularProgress, Tooltip, Fade, 
  useTheme, useMediaQuery, Button, Tabs, Tab
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import LeagueHeader from "../components/leagueHeader";
import LeagueDetailsSection from "../components/leagueDetailSection";
import LeagueContacts from "../components/leagueDetailSection/leagueContact";
import LeagueStandings from "../components/leagueStandings";
import MatchList from "../components/leagueMatchList";

const TournamentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdminOrCreator, setIsAdminOrCreator] = useState(false);
  const [activeTab, setActiveTab] = useState(0); 
  const [standings, setStandings] = useState([]);
  const [matches, setMatches] = useState([]); 
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isTournamentAdminOrCreator = async (tournamentId, token) => {
    try {
      const res = await fetch(`http://localhost:8080/api/tournaments/${tournamentId}/is-admin-or-creator`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to verify user role");
      return await res.json(); 
    } catch (error) {
      console.error("isTournamentAdminOrCreator error:", error);
      return { isAdminOrCreator: false };
    }
  };

  const fetchStandings = async () => {
    const token = sessionStorage.getItem("authToken");
    try {
      const res = await fetch(`http://localhost:8080/api/tournaments/${id}/standings`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch standings");
      const data = await res.json();
      console.log(data)
      setStandings(data);
    } catch (error) {
      console.error("Failed to fetch standings:", error);
      setError(error.message);
    }
  };

  const fetchMatches = async () => {
    const token = sessionStorage.getItem("authToken");
    try {
      const res = await fetch(`http://localhost:8080/api/matches/tournaments/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!res.ok) throw new Error("Failed to fetch matches");
      const data = await res.json();
      console.log(data);  
      setMatches(data); 
    } catch (error) {
      console.error("Failed to fetch matches:", error);
      setError(error.message); 
    }
  };
  

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`http://localhost:8080/api/tournaments/${id}`);
        if (!res.ok) throw new Error('Failed to fetch tournament');
        const data = await res.json();
        setTournament(data);

        const token = sessionStorage.getItem("authToken");
        if (token) {
          const result = await isTournamentAdminOrCreator(id, token);
          setIsAdminOrCreator(result.isAdminOrCreator);
        }

        await fetchStandings();
        await fetchMatches();
      } catch (error) {
        console.error("Failed to fetch tournament:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTournament();
  }, [id]);

  const handleJoinTournament = async () => {
    const token = sessionStorage.getItem("authToken");

    try {
      const response = await fetch(`http://localhost:8080/api/tournaments/${id}/join`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const message = await response.text();

      if (!response.ok) {
        throw new Error(message || "Join failed");
      }

      alert(message);
    } catch (err) {
      console.error("Join error:", err);
      alert("Error joining league: " + err.message);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return (
      <Container sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '80vh',
        background: theme.palette.background.default
      }}>
        <Fade in={true} style={{ transitionDelay: '200ms' }}>
          <Box textAlign="center">
            <CircularProgress size={60} thickness={4} color="primary" />
            <Typography variant="h6" sx={{ mt: 3, color: 'text.secondary' }}>
              Loading tournament details...
            </Typography>
          </Box>
        </Fade>
      </Container>
    );
  }

  if (error || !tournament) {
    return (
      <Container sx={{ 
        mt: 4, 
        textAlign: 'center',
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <Fade in={true}>
          <Box>
            <Typography variant="h4" color="error" sx={{ mb: 2 }}>
              ⚠️ Tournament Not Found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {error || "The requested tournament could not be loaded."}
            </Typography>
          </Box>
        </Fade>
      </Container>
    );
  }

  return (
    <Fade in={true}>
      <Container 
        maxWidth="lg" 
        sx={{ 
          mt: isMobile ? 2 : 4, 
          mb: 6,
          transition: 'all 0.3s ease'
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: isMobile ? 2 : 4, 
            borderRadius: 4, 
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.08)',
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            '&:hover': {
              boxShadow: '0px 12px 28px rgba(0, 0, 0, 0.12)'
            }
          }}
        >
          {isAdminOrCreator && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Tooltip title="Edit Tournament">
                <Button variant="outlined" color="primary" onClick={() => navigate(`/tournaments/${id}/edit`)}>
                  Edit
                </Button>
              </Tooltip>
            </Box>
          )}

          <LeagueHeader
            tournament={tournament}
            handleJoinTournament={handleJoinTournament}
            formatDate={formatDate}
            showJoinButton={!isAdminOrCreator}
          />

          {/* 新增Tabs导航 */}
          <Box sx={{ 
            mt: 4,
            borderBottom: 1, 
            borderColor: 'divider',
            position: 'sticky',
            top: 0,
            zIndex: 1,
            backgroundColor: theme.palette.background.paper,
            pt: 1
          }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons="auto"
              sx={{
                '& .MuiTabs-indicator': {
                  height: 3,
                  backgroundColor: theme.palette.primary.main
                }
              }}
            >
              <Tab label="Overview" />
              <Tab label="Standings" />
              <Tab label="Matches" />
              {tournament.contacts && tournament.contacts.length > 0 && (
                <Tab label="Contacts" />
              )}
            </Tabs>
          </Box>

          {/* Tab内容区域 */}
          <Box sx={{ pt: 3 }}>
            {activeTab === 0 && (
              <Box>
                <LeagueDetailsSection tournament={tournament} />
              </Box>
            )}
            
            {activeTab === 1 && (
              <Box sx={{ mt: 2 }}>
                <LeagueStandings standings={standings} />
              </Box>
            )}
            
            {activeTab === 2 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Matches
                </Typography>
            
                <MatchList matches={matches} /> 
              </Box>
            )}
            
            {activeTab === 3 && tournament.contacts && tournament.contacts.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <LeagueContacts contacts={tournament.contacts} />
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Fade>
  );
};

export default TournamentDetailsPage;