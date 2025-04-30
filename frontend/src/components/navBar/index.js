import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("authToken"); 
    navigate("/"); 
    window.location.reload();
  };


  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#004d40' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>

          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              Football Zone
            </Link>
          </Typography>


          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
            <Button color="inherit" component={Link} to="/matches">
              Matches
            </Button>
            <Button color="inherit" component={Link} to="/leagues">
              Leagues
            </Button>
            <Button color="inherit" component={Link} to="/teams">
              Team
            </Button>
            <Button color="inherit" component={Link} to="/my-organization">
              Organizations
            </Button>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {isAuthenticated && (
              <Button color="inherit" component={Link} to="/profile">Profile</Button>
            )}
            {isAuthenticated ? (
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            ) : (
              <Button color="inherit" component={Link} to="/login">Login</Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
