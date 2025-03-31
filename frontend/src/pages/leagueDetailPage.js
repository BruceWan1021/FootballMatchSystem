import React, { useState } from "react";
import { Container, Typography, Chip, Divider, CardMedia, Tabs, Tab } from "@mui/material";
import LeagueStandings from "../components/leagueStandings";
import MatchList from "../components/matchList";
import TeamList from "../components/teamList";

const teamNames = [
    "Software Warriors",
    "AI United",
    "Data Strikers",
    "Cyber Knights",
    "Neural Ninjas",
    "Quantum FC",
    "Code Blasters",
    "Tech Titans",
    "Bug Busters",
    "Binary Bandits"
];

const generatedMatches = [];
let matchId = 1;
for (let i = 0; i < teamNames.length; i++) {
    for (let j = i + 1; j < teamNames.length; j++) {
        generatedMatches.push({
            id: matchId++,
            teamA: teamNames[i],
            teamB: teamNames[j],
            date: `2025-04-${(matchId % 30 + 1).toString().padStart(2, "0")}`,
            status: matchId % 3 === 0 ? "Completed" : matchId % 3 === 1 ? "In Progress" : "Scheduled"
        });
    }
}

const generatedStandings = teamNames.map((team, index) => ({
    rank: index + 1,
    team,
    w: Math.floor(Math.random() * 5),
    d: Math.floor(Math.random() * 3),
    l: Math.floor(Math.random() * 3),
    gf: Math.floor(Math.random() * 15),
    ga: Math.floor(Math.random() * 10),
    pts: Math.floor(Math.random() * 20)
})).sort((a, b) => b.pts - a.pts).map((team, index) => ({ ...team, rank: index + 1 }));

const mockLeague = {
    id: 1,
    name: "2025 Spring Football League",
    startDate: "2025-03-15",
    endDate: "2025-06-01",
    status: "In Progress",
    department: "Computer Science",
    description: "An annual inter-departmental football competition at campus level.",
    bannerUrl: "https://via.placeholder.com/800x300?text=2025+Spring+Football+League",
    teams: teamNames.map((name, idx) => ({ id: idx + 1, name })),
    matches: generatedMatches,
    standings: generatedStandings
};

const LeagueDetailsPage = () => {
    const league = mockLeague;
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <Container sx={{ mt: 5, mb: 8 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                {league.name}
            </Typography>
            <Chip
                label={league.status}
                color={league.status === "Completed" ? "default" : league.status === "In Progress" ? "warning" : "success"}
                sx={{ mb: 2 }}
            />

            {league.bannerUrl && (
                <CardMedia
                    component="img"
                    image={league.bannerUrl}
                    alt={league.name}
                    sx={{ width: "100%", height: 300, objectFit: "cover", borderRadius: 2, mb: 3 }}
                />
            )}

            <Typography variant="body1" gutterBottom>
                📅 {league.startDate} → {league.endDate}
            </Typography>
            <Typography variant="body2" gutterBottom>
                🏫 Hosted by: {league.department}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {league.description}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                sx={{ mb: 3 }}
            >
                <Tab label={`Teams (${league.teams.length})`} />
                <Tab label="Standings" />
                <Tab label="Matches" />
            </Tabs>

            {tabIndex === 0 && <TeamList teams={league.teams} />}
            {tabIndex === 1 && <LeagueStandings standings={league.standings} />}
            {tabIndex === 2 && <MatchList matches={league.matches} />}
        </Container>
    );
};

export default LeagueDetailsPage;