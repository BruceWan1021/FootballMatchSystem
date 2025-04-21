import React, { useEffect, useState } from "react";
import {
  Container, Typography, Box, Tabs, Tab, CircularProgress, Snackbar
} from "@mui/material";
import { useParams } from "react-router-dom";
import LeagueInfoEditor from "../components/leagueManagement/leagueInforEditor";
import ScheduleManager from "../components/leagueManagement/scheduleManager";
import TeamApprovalList from "../components/leagueManagement/teamApprovalList";

const LeagueManagementPage = () => {
  const { id } = useParams(); // tournamentId
  const [tabIndex, setTabIndex] = useState(0);
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/tournaments/32`);
        if (!res.ok) throw new Error("Failed to load tournament");
        const data = await res.json();
        setTournament(data);
      } catch (error) {
        console.error(error);
        setSnackbar({ open: true, message: error.message });
      } finally {
        setLoading(false);
      }
    };
    fetchTournament();
  }, [id]);

  const handleTabChange = (e, newValue) => {
    setTabIndex(newValue);
  };

  if (loading) return (
    <Container sx={{ mt: 10, textAlign: "center" }}>
      <CircularProgress />
    </Container>
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        League Management: {tournament.name}
      </Typography>

      <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Edit Info" />
        <Tab label="Schedule" />
        <Tab label="Team Approval" />
      </Tabs>

      {tabIndex === 0 && (
            <LeagueInfoEditor tournament={tournament} setTournament={setTournament} />
      )}
      {tabIndex === 1 && (
        <ScheduleManager tournamentId={id} />
      )}
      {tabIndex === 2 && (
        <TeamApprovalList tournamentId={id} />
      )}

      <Snackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ open: false, message: "" })}
        message={snackbar.message}
        autoHideDuration={4000}
      />
    </Container>
  );
};

export default LeagueManagementPage;
