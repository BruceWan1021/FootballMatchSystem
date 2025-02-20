import React, { useState } from "react";
import { Paper, Typography, TextField, Button, Box, CircularProgress, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EmailVerify = ({ email }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const result = await response.json();

      if (response.ok) {
        // 服务器端已经在注册队列中存储了用户信息，只需要触发确认注册
        await fetch("http://localhost:8080/api/auth/confirm-registration", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }), // 只需要传递 email，让后端完成用户存储
        });

        alert("Verification successful, account created!");
        navigate("/login");
      } else {
        alert("Verification failed: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Verification failed:", error);
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
        <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", color: "green" }}>
          Enter Verification Code
        </Typography>

        <TextField
          margin="normal"
          required
          fullWidth
          label="Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <Button
          onClick={handleVerify}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: "green", color: "white" }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Verify"}
        </Button>
      </Paper>
    </Container>
  );
};

export default EmailVerify;
