import React, { useEffect, useState } from "react";
import { Container, Typography, Tabs, Tab, Card, CardContent, Button, Divider, CircularProgress, Stack } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import UserProfile from "../components/userProfile";
import MyStats from "../components/myStats";
import MatchList from "../components/matchList";

const ProfilePage = () => {
  const [tab, setTab] = useState(0);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showPlayerForm, setShowPlayerForm] = useState(false);
  const [showRefereeForm, setShowRefereeForm] = useState(false);

  const [formData, setFormData] = useState({
    position: "",
    number: "",
    height: "",
    weight: "",
    licenseNumber: "",
  });



  useEffect(() => {
    const fetchProfile = async () => {
      const token = sessionStorage.getItem("authToken");

      try {
        const response = await fetch("http://localhost:8080/api/profile/me", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || "Failed to fetch user profile");
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Error loading profile: " + error.message);
      } finally {
        setLoading(false);
      }
    };


    fetchProfile();
  }, []);


  if (loading) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h6">Failed to load profile.</Typography>
      </Container>
    );
  }

  const isPlayer = profile.roles?.includes("PLAYER");
  const isReferee = profile.roles?.includes("REFEREE");


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitPlayer = async () => {
    const token = sessionStorage.getItem("authToken");

    try {
      const response = await fetch("http://localhost:8080/api/profile/register/player", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          position: formData.position,
          number: parseInt(formData.number),
          teamId: parseInt(formData.teamId),
          height: parseInt(formData.height),
          weight: parseInt(formData.weight)
        })
      });

      const result = await response.text();
      if (!response.ok) throw new Error(result);
      alert(result);
      setShowPlayerForm(false);
      window.location.reload();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleSubmitReferee = async () => {
    const token = sessionStorage.getItem("authToken");

    try {
      const response = await fetch("http://localhost:8080/api/profile/register/referee", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          licenseNumber: formData.licenseNumber,
          tournamentId: parseInt(formData.tournamentId),
          height: parseInt(formData.height),
          weight: parseInt(formData.weight)
        })
      });

      const result = await response.text();
      if (!response.ok) throw new Error(result);
      alert(result);
      setShowRefereeForm(false);
      window.location.reload();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <UserProfile profile={profile} />

      {(!isPlayer || !isReferee) && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {isPlayer && !isReferee
                ? "You are registered as a Player"
                : !isPlayer && isReferee
                  ? "You are registered as a Referee"
                  : "You are not yet registered as a Player or Referee"}
            </Typography>

            <Stack direction="row" spacing={2}>
              {!isPlayer && (
                <Button variant="contained" onClick={() => setShowPlayerForm(true)}>
                  Become a Player
                </Button>
              )}
              {!isReferee && (
                <Button variant="outlined" onClick={() => setShowRefereeForm(true)}>
                  Become a Referee
                </Button>
              )}
            </Stack>
          </CardContent>
        </Card>
      )}

      {(isPlayer || isReferee) && (
        <>
          <Tabs value={tab} onChange={(e, val) => setTab(val)} sx={{ mb: 3 }}>
            {isPlayer && <Tab label="My Matches" />}
            {isPlayer && <Tab label="My Stats" />}
            <Tab label="Settings" />
          </Tabs>

          {isPlayer && tab === 0 && <MatchList matches={profile.matches || []} />}
          {isPlayer && tab === 1 && (
            <MyStats
              stats={profile.stats}
              skills={profile.skills}
              honors={profile.honors}
              ranking={profile.ranking}
            />
          )}

          {(tab === 2 || (!isPlayer && tab === 0)) && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Account Settings
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Button variant="outlined">Change Password</Button>
                <Button color="error" sx={{ ml: 2 }}>
                  Log Out
                </Button>
              </CardContent>
            </Card>
          )}
        </>
      )}
      {/* Player Dialog */}
      <Dialog open={showPlayerForm} onClose={() => setShowPlayerForm(false)}>
        <DialogTitle>Register as Player</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Position" name="position" onChange={handleInputChange} />
          <TextField label="Number" name="number" type="number" onChange={handleInputChange} />
          <TextField label="Height (cm)" name="height" type="number" onChange={handleInputChange} />
          <TextField label="Weight (kg)" name="weight" type="number" onChange={handleInputChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPlayerForm(false)}>Cancel</Button>
          <Button onClick={handleSubmitPlayer}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Referee Dialog */}
      <Dialog open={showRefereeForm} onClose={() => setShowRefereeForm(false)}>
        <DialogTitle>Register as Referee</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="License Number" name="licenseNumber" onChange={handleInputChange} />
          <TextField label="Height (cm)" name="height" type="number" onChange={handleInputChange} />
          <TextField label="Weight (kg)" name="weight" type="number" onChange={handleInputChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRefereeForm(false)}>Cancel</Button>
          <Button onClick={handleSubmitReferee}>Submit</Button>
        </DialogActions>
      </Dialog>

    </Container>


  );
};

export default ProfilePage;
