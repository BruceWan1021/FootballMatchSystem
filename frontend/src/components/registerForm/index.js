import React, { useState } from "react";
import { Paper, Typography, TextField, Button, CircularProgress,Box,     Container } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

const RegisterForm = ({ setStep, setEmail }) => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: formData.username, email: formData.email, password: formData.password }),
      });

      if (response.ok) {
        setEmail(formData.email);
        setStep(2);
      } else {
        const result = await response.json();
        alert("Registration failed: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      alert("Network error, please try again later!");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <SportsSoccerIcon sx={{ fontSize: 50, color: "green", mb: 2 }} />
        <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", color: "green" }}>
          SoccerSphere - Register
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus value={formData.username} onChange={handleChange} />
          <TextField margin="normal" required fullWidth id="email" label="Email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} />
          <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" value={formData.password} onChange={handleChange} />
          <TextField margin="normal" required fullWidth name="confirmPassword" label="Confirm Password" type="password" id="confirmPassword" autoComplete="new-password" value={formData.confirmPassword} onChange={handleChange} />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: "green", color: "white" }} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterForm;
