import React, { useState } from "react";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Button,
  Divider
} from "@mui/material";
import UserProfile from "../components/userProfile";
import MyStats from "../components/myStats";
import MatchList from "../components/matchList";

const mockProfile = {
  name: "Alex Chen",
  studentId: "202312345",
  email: "alex.chen@example.edu",
  department: "Computer Science",
  role: "Player",
  team: "AI United",
  position: "Midfielder",
  height: "178 cm",
  weight: "70 kg",
  age: 21,
  jerseyNumber: 10,
  avatarUrl: "https://i.pravatar.cc/150?img=12",
  joined: "2023-09-01",
  nationality: "China",
  foot: "Right",
  pace: 87,
  bio: "Fast and fearless on the field.",
  stats: {
    matches: 15,
    goals: 6,
    assists: 4,
    yellowCards: 2,
    redCards: 0,
    minutesPlayed: 1125,
    starts: 10,
    subs: 5
  },
  skills: ["Pace 87", "Dribble 80", "Vision 82"],
  honors: ["Top Scorer 2024", "MVP Spring League"],
  ranking: {
    top: 3,
    category: "Goals",
    note: "Ranked 3rd among 102 players"
  },
  matches: [
    { id: 1, opponent: "Data Strikers", date: "2025-04-10", result: "W 3-1" },
    { id: 2, opponent: "Cyber Knights", date: "2025-04-18", result: "L 0-1" },
    { id: 3, opponent: "Neural Ninjas", date: "2025-05-01", result: "D 2-2" }
  ]
};

const ProfilePage = () => {
  const [tab, setTab] = useState(0);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <UserProfile profile={mockProfile} />

      <Tabs value={tab} onChange={(e, val) => setTab(val)} sx={{ mb: 3 }}>
        <Tab label="My Matches" />
        <Tab label="My Stats" />
        <Tab label="Settings" />
      </Tabs>

      {tab === 0 && <MatchList matches={mockProfile.matches} />}

      {tab === 1 && (
        <MyStats
          stats={mockProfile.stats}
          skills={mockProfile.skills}
          honors={mockProfile.honors}
          ranking={mockProfile.ranking}
        />
      )}

      {tab === 2 && (
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
    </Container>
  );
};

export default ProfilePage;