import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated }) => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#004d40' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
     
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              SoccerSphere
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
            {/* <Button color="inherit" component={Link} to="/shop">
              Shop
            </Button> */}
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {isAuthenticated?<Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>:""}
            <Button color="inherit" component={Link} to={isAuthenticated?"/logout":"/login"}>
              {isAuthenticated?"logout":"login"}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
