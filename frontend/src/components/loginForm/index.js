import React, { useState } from "react";
import { Container, Paper, Typography, TextField, Button, Box } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.text();
      if (response.ok) {
        alert("Login Successful:" + result);
        navigate('/home');
    } else {
        alert("登录失败：" + result);
    }
    } catch (error) {
      console.error("请求失败:", error);
      alert("网络错误，请稍后重试！");
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ backgroundImage: 'url(/images/football-bg.jpg)', backgroundSize: 'cover', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <SportsSoccerIcon sx={{ fontSize: 50, color: 'green', mb: 2 }} />
        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', color: 'green' }}>
        SoccerSphere - Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username/Email"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: 'green', color: 'white' }}>
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
