import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f5f5f5',
        py: 3,
        mt: 'auto',
        borderTop: '1px solid #ddd',
        margin: 2
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} My Website. All rights reserved.
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Link href="/about" underline="hover" color="primary" sx={{ mx: 1 }}>
            About
          </Link>
          <Link href="/contact" underline="hover" color="primary" sx={{ mx: 1 }}>
            Contact
          </Link>
          <Link href="/privacy" underline="hover" color="primary" sx={{ mx: 1 }}>
            Privacy Policy
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
