import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom"; // 导入 useNavigate

const UpcomingLeagues = () => {
  const [tournaments, setTournaments] = useState([]);
  const navigate = useNavigate(); // 初始化 navigate

  useEffect(() => {
    fetch('http://localhost:8080/api/tournaments/all')
      .then(response => response.json())
      .then(data => {
        const formattedTournaments = data.map(tournament => ({
          title: tournament.name || "Unknown Name",
          image: tournament.logoUrl || "/images/footballClub.png",
          id: tournament.id, // 假设你的数据中有一个 id 字段
        }));
        setTournaments(formattedTournaments);
      })
      .catch(error => console.error('Error fetching tournaments:', error));
  }, []);

  const handleCardClick = (id) => {
    navigate(`/leagues/${id}`); // 跳转到对应的 LeagueDetail 页面
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        ⚽ Top 4 Leagues
      </Typography>
      <Grid container spacing={4} justifyContent="space-between">
        {tournaments.slice(0, 4).map((league, index) => (
          <Grid item xs={12} sm={3} md={3} key={index}>
            <Card sx={{ maxWidth: 345 }} onClick={() => handleCardClick(league.id)}> {/* 点击时触发跳转 */}
              <CardMedia
                component="img"
                height="140"
                image={league.image}
                alt={league.title}
              />
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  {league.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UpcomingLeagues;
