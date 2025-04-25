
import React, { useEffect, useState } from "react";
import {
  Container, Typography, Box, Tabs, Tab, CircularProgress, Snackbar
} from "@mui/material";
import { useParams } from "react-router-dom";
import TeamInfoEditor from "../components/teamManagement/teamInfoEditor.js";
import PlayerList from "../components/teamManagement/approvalPlayerList.js";
import EditablePlayerList from "../components/teamManagement/editPlayerList.js";
import MatchHistory from "../components/teamManagement/matchList.js";
import TeamStats from "../components/teamManagement/teamStats";

const TeamManagementPage = () => {
  const { id } = useParams(); // teamId
  const [tabIndex, setTabIndex] = useState(0);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("authToken");
      const res = await fetch(`http://localhost:8080/api/teams/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Failed to load team");
      const data = await res.json();
      setTeam(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setSnackbar({ open: true, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, [id]);

  const handleTabChange = (e, newValue) => {
    setTabIndex(newValue);
  };

  if (loading || !team) return (
    <Container sx={{ mt: 10, textAlign: "center" }}>
      <CircularProgress />
    </Container>
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Team Management: {team?.name || "Untitled Team"}
      </Typography>

      <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Edit Info" />
        <Tab label="Approve Players" />
        <Tab label="Players" />
        <Tab label="Match" />
        <Tab label="Statistics" />
      </Tabs>

      {tabIndex === 0 && (
        <TeamInfoEditor
          team={team}
          setTeam={setTeam}
          refetchTeam={fetchTeam}
        />
      )}
      {tabIndex === 1 && (
        <PlayerList teamId={id} />
      )}
      {tabIndex === 2 && (
        <EditablePlayerList teamId={id} />
      )}
      {tabIndex === 3 && (
        <MatchHistory teamId={id} />
      )}
      {tabIndex === 4 && (
        <TeamStats teamId={id} />
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

export default TeamManagementPage;
