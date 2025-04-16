import React from "react";
import { Box, Divider, Typography, Grid, Paper, Avatar, Chip, Stack, Link, Button } from "@mui/material";
import { ContactMail, Phone, Person, Email, Call } from "@mui/icons-material";

const LeagueContacts = ({ contacts }) => {
    if (!contacts || contacts.length === 0) return null;

    return (
        <Box sx={{ mt: 6 }}>
            <Divider sx={{ 
                my: 4, 
                borderColor: 'divider',
                borderBottomWidth: 2,
                opacity: 0.8
            }} />
            
            <Typography variant="h4" gutterBottom sx={{ 
                display: 'flex', 
                alignItems: 'center',
                fontWeight: 600,
                mb: 4,
                color: 'text.primary'
            }}>
                <ContactMail color="primary" sx={{ 
                    mr: 2, 
                    fontSize: '2rem',
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    p: 1,
                    borderRadius: '50%'
                }} /> 
                Tournament Contacts
            </Typography>

            <Grid container spacing={3}>
                {contacts.map((contact, idx) => (
                    <Grid item xs={12} sm={6} md={4} key={idx}>
                        <Paper elevation={3} sx={{ 
                            p: 3, 
                            borderRadius: 3, 
                            bgcolor: 'background.paper',
                            height: '100%',
                            borderTop: '4px solid',
                            borderColor: contact.isPrimary ? 'primary.main' : 'divider',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.12)'
                            }
                        }}>
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                mb: 3 
                            }}>
                                <Avatar sx={{ 
                                    bgcolor: contact.isPrimary ? 'primary.main' : 'secondary.main', 
                                    mr: 2,
                                    width: 56,
                                    height: 56,
                                    fontSize: '1.5rem'
                                }}>
                                    <Person sx={{ fontSize: '1.5rem' }} />
                                </Avatar>
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {contact.name}
                                        </Typography>
                                        {contact.isPrimary && (
                                            <Chip
                                                label="Primary"
                                                size="small"
                                                color="primary"
                                                sx={{ 
                                                    ml: 1.5,
                                                    fontWeight: 600,
                                                    height: 24
                                                }}
                                            />
                                        )}
                                    </Box>
                                    <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
                                        {contact.role || "Tournament Contact"}
                                    </Typography>
                                </Box>
                            </Box>

                            <Stack spacing={2} sx={{ pl: 1 }}>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ 
                                        mb: 1,
                                        color: 'text.secondary',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <Email fontSize="small" sx={{ mr: 1 }} /> Email
                                    </Typography>
                                    <Button
                                        component={Link}
                                        href={`mailto:${contact.email}`}
                                        startIcon={<Email />}
                                        sx={{
                                            textTransform: 'none',
                                            fontWeight: 500,
                                            color: 'primary.main',
                                            pl: 0,
                                            '&:hover': {
                                                textDecoration: 'underline'
                                            }
                                        }}
                                    >
                                        {contact.email}
                                    </Button>
                                </Box>
                                
                                {contact.phone && (
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ 
                                            mb: 1,
                                            color: 'text.secondary',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <Call fontSize="small" sx={{ mr: 1 }} /> Phone
                                        </Typography>
                                        <Button
                                            component={Link}
                                            href={`tel:${contact.phone}`}
                                            startIcon={<Call />}
                                            sx={{
                                                textTransform: 'none',
                                                fontWeight: 500,
                                                color: 'primary.main',
                                                pl: 0,
                                                '&:hover': {
                                                    textDecoration: 'underline'
                                                }
                                            }}
                                        >
                                            {contact.phone}
                                        </Button>
                                    </Box>
                                )}
                            </Stack>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default LeagueContacts;