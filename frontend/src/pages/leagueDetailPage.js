import React, { useEffect, useState } from "react";
import { 
  Box, Typography, Container, Grid, Paper, 
  Avatar, CircularProgress, Tooltip, Fade, 
  useTheme, useMediaQuery 
} from "@mui/material";
import { useParams } from "react-router-dom";
import LeagueHeader from "../components/leagueHeader";
import LeagueDetailsSection from "../components/leagueDetailSection";
import LeagueContacts from "../components/leagueDetailSection/leagueContact";

const TournamentDetailsPage = () => {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`http://localhost:8080/api/tournaments/${id}`);
        if (!res.ok) throw new Error('Failed to fetch tournament');
        const data = await res.json();
        setTournament(data);
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

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Join failed");
      }

      alert("Successfully joined the league!");
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
          <LeagueHeader
            tournament={tournament}
            handleJoinTournament={handleJoinTournament}
            formatDate={formatDate}
          />

          <Box sx={{ 
            my: 4,
            background: `linear-gradient(to right, ${theme.palette.divider}, transparent)`,
            height: '1px',
            width: '100%'
          }} />

          <LeagueDetailsSection tournament={tournament} />

          {tournament.contacts && tournament.contacts.length > 0 && (
            <>
              <Box sx={{ 
                my: 4,
                background: `linear-gradient(to right, ${theme.palette.divider}, transparent)`,
                height: '1px',
                width: '100%'
              }} />
              
              <LeagueContacts contacts={tournament.contacts} />
            </>
          )}
        </Paper>
      </Container>
    </Fade>
  );
};

export default TournamentDetailsPage;